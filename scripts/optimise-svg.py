"""Recompresse les images bitmap embarquées dans les SVG exportés de Figma.

Usage : python3 scripts/optimise-svg.py src/assets/<slug>/*.svg

Pour chaque <image id="imageN" width=… height=…> :
  - on calcule la taille à laquelle elle est réellement affichée (via les
    <pattern> qui l'utilisent et les rect/path qu'ils remplissent) ;
  - on la redimensionne à 2x cette taille au maximum (écran retina, conteneur
    de 1072 px de large sur la page projet) ;
  - opaque -> JPEG q82, avec alpha -> PNG optimisé.
"""
import re, sys, base64, io, math
from PIL import Image

CONTAINER_PX = 1072   # largeur max d'une image sur la page projet
DPR = 2

def optimise(path):
    s = open(path, encoding="utf-8").read()
    before = len(s)
    # Les exports du MCP Figma glissent un `data-name` (nom du fichier source)
    # entre `id` et `width` : sans ce nettoyage, aucune image n'est reconnue.
    s = re.sub(r'(<image id="[^"]+") data-name="[^"]*"', r'\1', s)
    vbw = float(re.search(r'viewBox="([\d.\-]+) [\d.\-]+ ([\d.\-]+)', s).group(2))
    k = CONTAINER_PX / vbw          # px CSS par unité SVG

    # pattern id -> (image id, a, d)
    pats = {}
    for m in re.finditer(r'<pattern id="([^"]+)"[^>]*>\s*<use xlink:href="#([^"]+)"'
                         r'(?:\s+transform="(matrix\(([^)]*)\)|scale\(([^)]*)\))")?', s):
        pid, iid, _, mat, sca = m.group(1), m.group(2), m.group(3), m.group(4), m.group(5)
        if mat:
            v = [float(x) for x in mat.replace(',', ' ').split()]
            a, d = v[0], v[3]
        elif sca:
            v = [float(x) for x in sca.replace(',', ' ').split()]
            a, d = v[0], v[1] if len(v) > 1 else v[0]
        else:
            a = d = 1.0
        pats[pid] = (iid, a, d)

    # dimensions en pixels de chaque bitmap
    iw_of = {m.group(1): (int(m.group(2)), int(m.group(3)))
             for m in re.finditer(r'<image id="([^"]+)" width="(\d+)" height="(\d+)"', s)}

    # taille affichée max de chaque image (en unités SVG)
    need = {}
    def bbox_of_path(d):
        # approximation : enveloppe des points de contrôle du tracé
        nums = [float(x) for x in re.findall(r'-?\d+(?:\.\d+)?(?:e-?\d+)?', d)]
        xs, ys = nums[0::2], nums[1::2]
        if not xs or not ys:
            return None
        return max(xs) - min(xs), max(ys) - min(ys)

    for m in re.finditer(r'<(rect|path)\b[^>]*?/?>', s):
        tag = m.group(0)
        fm = re.search(r'fill="url\(#([^)]+)\)"', tag)
        if not fm or fm.group(1) not in pats:
            continue
        iid, a, d = pats[fm.group(1)]
        if iid not in iw_of:
            continue
        if m.group(1) == "rect":
            w = re.search(r'\bwidth="([\d.]+)"', tag)
            h = re.search(r'\bheight="([\d.]+)"', tag)
            if not w:
                continue
            bw, bh = float(w.group(1)), float(h.group(1)) if h else 0
        else:
            dm = re.search(r'\sd="([^"]+)"', tag)
            if not dm:
                continue
            bb = bbox_of_path(dm.group(1))
            if not bb:
                continue
            bw, bh = bb
        du = bw * a * iw_of[iid][0]
        dv = bh * d * iw_of[iid][1]
        cw, ch = need.get(iid, (0, 0))
        need[iid] = (max(cw, du), max(ch, dv))

    out = s
    for m in re.finditer(
            r'<image id="([^"]+)" width="(\d+)" height="(\d+)"([^>]*?)'
            r'xlink:href="data:image/(png|jpeg);base64,([^"]+)"', s):
        iid, iw, ih, mid, fmt, b64 = (m.group(1), int(m.group(2)), int(m.group(3)),
                                      m.group(4), m.group(5), m.group(6))
        raw = base64.b64decode(b64)
        im = Image.open(io.BytesIO(raw))
        du, dv = need.get(iid, (iw / k, ih / k))
        target = max(64, math.ceil(du * k * DPR))      # largeur cible en px
        new = im
        if target < iw:
            new = im.resize((target, max(1, round(ih * target / iw))), Image.LANCZOS)

        # transparence réelle ?
        alpha = None
        if new.mode in ("RGBA", "LA", "P"):
            conv = new.convert("RGBA")
            alpha = conv.getchannel("A")
            opaque = alpha.getextrema()[0] == 255
        else:
            opaque = True

        buf = io.BytesIO()
        if opaque:
            new.convert("RGB").save(buf, "JPEG", quality=82, optimize=True, progressive=True)
            newfmt = "jpeg"
        else:
            new.convert("RGBA").save(buf, "PNG", optimize=True)
            newfmt = "png"
            # photo détourée : la palette 256 couleurs divise le poids par ~4
            # sans différence visible à la taille d'affichage.
            qbuf = io.BytesIO()
            new.convert("RGBA").quantize(colors=256, method=Image.FASTOCTREE).save(
                qbuf, "PNG", optimize=True)
            if qbuf.tell() < buf.tell():
                buf = qbuf
            if buf.tell() > len(raw):          # la recompression n'aide pas
                buf = io.BytesIO(raw); newfmt = fmt; new = im
        data = buf.getvalue()
        if len(data) >= len(raw) and new.size == im.size:
            print(f"   = {iid} {im.size} {fmt} {len(raw)/1e6:.2f} Mo (inchangé)")
            continue
        # width/height restent ceux d'origine : le motif qui référence l'image
        # est calibré dessus (matrix en coordonnées pixel de l'image).
        repl = (f'<image id="{iid}" width="{iw}" height="{ih}"{mid}'
                f'xlink:href="data:image/{newfmt};base64,{base64.b64encode(data).decode()}"')
        out = out.replace(m.group(0), repl)
        print(f"   ↓ {iid} {im.size}{fmt} {len(raw)/1e6:.2f} Mo → "
              f"{new.size}{newfmt} {len(data)/1e6:.2f} Mo  (affiché {du*k:.0f} px)")

    if out != s:
        open(path, "w", encoding="utf-8").write(out)
    print(f"{path}: {before/1e6:.2f} Mo → {len(out)/1e6:.2f} Mo\n")

for p in sys.argv[1:]:
    optimise(p)
