# CLAUDE.md

Portfolio de **Gabriela Carneiro** (« Gabi », directrice artistique & graphiste), construit
sur le site et la **DA Sordulo** de Sacha Moricet : le code et la direction artistique
viennent de Sordulo, l'identité et le contenu sont ceux de Gabriela. Site statique React,
déployé sur Firebase Hosting (projet de `.firebaserc`, URL encore
`https://sacha-moricet.web.app` — les URL absolues de `index.html` en dépendent).

Les trois projets (Kook, Kuchisake-Onna, Ouroboros) et le CV sont repris du dépôt
`~/Documents/GitHub/AUTRES/PortfolioGabi` (Vite + Tailwind v4, routeur par hash), **lecture
seule** : n'y rien modifier, ne pas lancer ni tuer son serveur de dev.

**Avant tout travail visuel, lire [`DESIGN.md`](./DESIGN.md)** : typographie, duos de
couleurs par page, mise en page, motion et composants à réutiliser.

## Stack

- React 19 + Vite 6, JavaScript (pas de TypeScript), ESM.
- Tailwind CSS v4 via `@tailwindcss/vite` — **pas de `tailwind.config.js`** : les tokens
  sont dans le bloc `@theme` de `src/index.css`.
- Routing : `react-router-dom` v7 (`BrowserRouter` dans `src/main.jsx`, routes dans
  `src/App.jsx`). Les composants importent `Link` depuis `react-router`.
- Animation : GSAP (+ `CustomEase`, `ScrollTrigger`), Framer Motion (rideaux de
  transition, `AnimatePresence`), SplitType (découpage en lignes), Lenis (smooth scroll).

## Commandes

```bash
npm run dev       # serveur Vite (souvent déjà lancé, sur 5174 : le réutiliser)
npm run build     # build dans dist/
npm run lint      # ESLint (flat config, eslint.config.js)
npm run preview   # sert dist/
firebase deploy   # publie dist/ (projet défini dans .firebaserc)
```

Pas de tests. Le lint signale des erreurs **antérieures** (imports morts de `Navbar`,
`useRevealer`, faux positifs `motion` faute d'`eslint-plugin-react`) : ne pas en ajouter.

## Architecture

```
src/
  main.jsx, App.jsx         # entrée + routes : /  /about  /projets/:slug
  index.css                 # @font-face, @theme (tokens), classes utilitaires globales
  projectList.js            # DONNÉES des projets (duo de couleurs, carte, case study)
  profile.js                # identité + CV de Gabriela (hero, rideau, footer, À propos)
  Home/                     # Home, Header (hero), GridProjet (grille des projets)
  About/About.jsx           # CV : expériences, scolarité, compétences
  ProjetPage/PageProjet.jsx # page projet générique (StudyTitle, SectionContent)
  components/               # Navbar, Footer, Transition, TextReveal, ProjectPager, Lenis…
  hooks/                    # useFitText, reducedMotion
  assets/projets/           # card-*.png + un dossier de planches SVG par projet
scripts/                    # optimise-svg.py, arrondir-traces.py (planches Figma)
public/font/                # fontes .otf/.ttf
```

- **Ajouter un projet** = ajouter un objet dans `projectList` : `slug` (URL
  `/projets/<slug>`), `title` / `description` / `image` (carte), duo
  `backgroundColor` / `textColor`, et `study` (`title`, `year`, `category`, `status`,
  `context`, `sections[]`). Une section est `image` (une planche) ou `images` (plusieurs
  empilées). L'ordre du tableau fait l'ordre de la grille, le compteur `(n/total)` et le
  pager. Planches dans `src/assets/projets/<slug>/`, importées dans `projectList.js`.
- **Contenu personnel** (nom, rôle, email, LinkedIn, lignes du hero, mot du rideau, CV) :
  uniquement dans `src/profile.js`. Ne pas inventer de bio : `resume.intro` reprend le CV.
- Les couleurs de page circulent par props (`setbgColor`/`settextColor`) pour que le
  rideau de transition prenne la couleur de la page de destination : **`bgColor` = fond du
  rideau**, et un lien vers un projet le règle à l'**encre** du projet
  (`setbgColor(p.textColor)`, `settextColor(p.backgroundColor)`).

### Composants projet

- `Home/GridProjet.jsx` — grille `md:grid-cols-3`, chaque carte est **un seul lien** :
  l'image, puis nom du projet / catégorie — année en Outfit dessous (pas de titre display,
  de description ni de filet). Entrée au premier passage
  dans le viewport (IntersectionObserver) : image dévoilée par `clip-path`, labels sortis
  de leur masque.
- `ProjetPage/PageProjet.jsx` — slug inconnu (dont les anciennes URL `/projets/1`) →
  `<Navigate to="/">`. Hero `(n/total) · TITRE · année`, puis (à partir de `lg` seulement,
  empilé en dessous) grille 12 colonnes : colonne
  texte collée (rôle, contexte, **sommaire** cliquable des planches) et colonne planches
  (label `(section)` + `01/05` sous un filet). Points délicats, à ne pas casser :
  - le compteur et l'année sont **dans le flux** (`min-w-[80px]` chacun, même largeur
    pour garder le titre centré), pas posés par-dessus ; sous `sm` ils passent sous le
    titre. **`min-w-0` sur la colonne du titre est indispensable** (un élément flex refuse
    sinon de descendre sous sa largeur naturelle) ;
  - `StudyTitle` mesure le **morceau insécable le plus large** (« Kuchisake- », « Onna »)
    via une sonde hors flux, et c'est le navigateur qui passe à la ligne. Le plafond est
    l'échelle display du site, appliqué en CSS : `font-size: min(<fit>px, var(--title-cap))`
    avec `--title-cap` à 24vw sous `sm`, 14vw au-delà ;
  - les planches se dévoilent via IntersectionObserver, pas ScrollTrigger : les SVG
    chargés en lazy changent la hauteur de la page après coup.
- `components/ProjectPager.jsx` — précédent / suivant, la liste **boucle**. Deux liens en Outfit
  (chevron + nom du projet, souligné qui glisse), sans titre display ni filet ; le sens
  n'étant plus écrit, il est porté par l'`aria-label` (« Projet suivant : Kook »).
- `hooks/useFitText.js` — ajuste un texte d'une ligne à la largeur de son conteneur. La
  boîte mesurée (`boxRef`) ne porte **aucun padding** (`clientWidth` l'inclut) ; le texte
  mesuré est `whitespace-nowrap`.
- `hooks/reducedMotion.js` — `prefersReducedMotion()` : sous `prefers-reduced-motion`,
  les entrées GSAP sont **sautées** (élément directement en place), les transitions CSS
  ont leur `motion-reduce:transition-none`.
- `components/TextReveal.jsx` — découpe les `.reveal-line` **après `document.fonts.ready`**
  (des lignes calculées avec la police de repli se recassaient) et ne redécoupe pas un
  élément déjà traité (double montage du mode strict). Un texte `.reveal-line` doit être
  **un seul nœud texte** : `/{x}` en JSX donne deux nœuds que SplitType sépare d'un
  espace (« / DA ») — écrire `{`/${x}`}`.

## Planches de charte : traitement d'un export Figma

Les SVG sortis de Figma embarquent les photos en pleine résolution (le prototype Kook
pesait 14 Mo). Dans l'ordre :

1. `python3 scripts/optimise-svg.py src/assets/projets/<slug>/*.svg` — recompresse chaque
   bitmap à 2× sa taille d'affichage (JPEG q82 si opaque, PNG 256 couleurs sinon). **Ne
   jamais toucher aux `width`/`height` du `<image>`** : la matrice du `<pattern>` est en
   pixels de l'image d'origine.
2. `python3 scripts/arrondir-traces.py src/assets/projets/<slug>/*.svg` — coordonnées des
   `d` à 2 décimales (~10 % gagnés).
3. Recadrer la `viewBox` sur le contenu si la frame laisse du vide (mesure : rendu
   `rsvg-convert` + `getbbox()` alpha).

Les planches ont leur fond de carte et leurs coins arrondis **cuits dans l'export** (gris
`#F2F2F2` pour Kuchisake-Onna et Ouroboros, taupe `#E6DED7` pour Kook).

### Export via le MCP Figma (`download_assets`, format SVG)

Fichier Figma `GP1BaXkrU0AXWvsn2fHOCT` ; planches Kook dans le cadre `91:2255`. L'export
SVG d'un nœud par le MCP diffère d'un export manuel — à corriger avant l'étape 1 :

- il embarque les **fonds des ancêtres** : un `<rect … fill="black"/>` pleine taille puis le
  fond du cadre parent (`<rect width="4015" height="14361" … fill="#FFF7EF"/>`). Les
  retirer, sinon les coins arrondis sont pleins et forment des carrés sur le fond de page ;
- le fond de carte est un **noir à 10 %** (`fill="black" fill-opacity="0.1"`) qui ne prend
  sa teinte que sur le crème du parent : le remplacer par la couleur opaque rendue
  (`#E6DED7` pour Kook) ;
- un calque **frère** qui déborde sur un cadre est absent de l'export du cadre (le pied
  gauche de la mascotte, vecteur `62:2352`, a été réinséré à la main dans
  `kook/mascotte-hero.svg`, position mesurée par différence avec la capture Figma) ;
- les `<image>` portent un `data-name` — `optimise-svg.py` le retire ;
- exporter le **nœud de contenu** plutôt que son cadre quand celui-ci laisse du vide
  (logo Kook : « Visuel logo » `62:2174`, pas « Logo »).

Vérifier chaque planche contre une capture Figma du cadre parent à l'échelle 1 (la capture
d'un cadre seul n'inclut pas les calques frères). Écart connu : sur l'écran « Plan de la
semaine » du prototype Kook, l'export SVG de Figma recadre les photos des cartes pivotées
un peu plus serré que Figma lui-même (Chrome et `rsvg-convert` rendent pareil).

## Pièges connus

- Le texte courant est en **Outfit** (`font-outfit`, variable, auto-hébergée depuis le
  vault, OFL) avec une graisse par défaut de 500 posée en `@layer base`. `font-neue` n'a
  pas de `@font-face`. Les `.otf` Neue Montreal / Supply Mono de `public/font/` sont
  inutilisés (et en Free Personal Use).
- `Navbar2`, `MatterCubes`, `useRevealer` (appelle `useGSAP` non importé) ne sont pas
  utilisés.
- Couleurs de page en hex dans les composants (duos par page) : c'est la convention du
  site, les duos projet vivent dans `projectList.js`.
- `.firebase/` (cache de déploiement) est versionné.
- Favicon, icônes du manifest et image Open Graph (`public/logo.*`) sont encore le logo
  Sordulo : à remplacer par une marque Gabriela.
- Vérification dans Chrome piloté : si l'onglet est en arrière-plan
  (`document.hidden`), GSAP, Framer et les IntersectionObserver sont gelés — le hero
  paraît vide et le rideau reste affiché. Ce n'est pas un bug du site.

## Maintenance de ce fichier

Garde ce CLAUDE.md à jour. Dès qu'une nouvelle fonctionnalité, dépendance, partie d'architecture, convention ou commande importante apparaît ou change, mets à jour la section concernée du fichier. N'ajoute que des informations utiles et durables, jamais de détails éphémères.
