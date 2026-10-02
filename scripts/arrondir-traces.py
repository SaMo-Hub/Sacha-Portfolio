"""Arrondit à 2 décimales les coordonnées des attributs `d` (précision Figma
inutile : 0,01 unité SVG est très en dessous du pixel affiché)."""
import re, sys

NUM = re.compile(r'-?\d+\.\d+')

def shrink(d):
    def r(m):
        v = round(float(m.group(0)), 2)
        s = f"{v:.2f}".rstrip("0").rstrip(".")
        return s if s not in ("-0", "") else "0"
    out = NUM.sub(r, d)
    # supprime les espaces devenus inutiles devant un nombre négatif ou un point
    out = re.sub(r'\s+-', '-', out)
    out = re.sub(r'\s+', ' ', out)
    return out

for path in sys.argv[1:]:
    s = open(path, encoding="utf-8").read()
    before = len(s)
    out = re.sub(r'(\sd=")([^"]+)(")', lambda m: m.group(1) + shrink(m.group(2)) + m.group(3), s)
    open(path, "w", encoding="utf-8").write(out)
    print(f"{path}: {before/1e6:.2f} Mo → {len(out)/1e6:.2f} Mo")
