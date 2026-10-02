# DESIGN.md — Direction artistique Sordulo

> Le site est désormais le portfolio de **Gabriela Carneiro**, mais il garde la DA
> Sordulo décrite ici : seuls l'identité (nom, rideau, contacts) et le contenu changent.

Référence à lire **avant** de créer ou modifier quoi que ce soit de visible sur ce site.
Elle décrit la DA telle qu'elle est réellement implémentée dans le code (pas une DA
idéale) : quand tu ajoutes un écran, il doit avoir l'air d'avoir toujours été là.

---

## 1. L'esprit en une phrase

**Éditorial, typographique, presque brutaliste — et très animé.**
Deux voix typographiques qui ne se mélangent jamais (un display condensé gigantesque et
une sans minuscule en capitales), deux couleurs par page, des filets fins, aucun
ornement. Tout le « luxe » vient du mouvement : rideaux de transition, révélations par
masque, soulignés qui glissent.

Ce qui n'existe **pas** dans cette DA, et ne doit pas apparaître :
ombres portées, dégradés, glassmorphism, cartes arrondies, icônes décoratives, emojis,
illustrations, couleurs d'accent multiples, gros arrondis, texte en casse normale dans les
labels.

---

## 2. Typographie

### Deux familles, deux rôles stricts

| Classe Tailwind | Fichier réellement chargé | Rôle | Toujours |
| --- | --- | --- | --- |
| `font-ztbroskon` | `public/font/ZTBrosOskon90s-Regular.otf` | **Display** : titres, noms de projets, entrées du menu, mot du rideau (« Gabi ») | `uppercase`, taille en `vw`, interligne serré |
| `font-outfit` | `public/font/Outfit-Variable.woff2` (Outfit variable, graisse par défaut **500**) | **Tout le reste** : labels, paragraphes, nav, boutons, footer, dates | `uppercase` (sauf paragraphes longs), `text-xs` |

> Outfit remplace l'ancienne mono (PP Neue Montreal Mono Medium, en Free Personal Use).
> La graisse 500 est posée par `.font-outfit` dans `@layer base` (`src/index.css`) : en
> Regular, le texte de 12 px paraissait maigre. Un utilitaire `font-*` la surcharge.
>
> `font-neue` est déclaré dans `@theme` mais **aucun `@font-face` ne le charge** : ne pas
> l'utiliser.

### Échelle

Il n'y a que deux tailles qui comptent : **énorme** et **minuscule**. Pas de tailles
intermédiaires (pas de `text-lg`, `text-2xl`, sous-titres moyens…).

| Usage | Valeur en place |
| --- | --- |
| Hero home (« DA / Graphiste ») | `text-[17vw]/[16vw]`, lignes masquées en `h-[14vw]` |
| Titre de page projet | `text-[14vw]/[14vw]`, conteneur `h-[14.6vw] overflow-hidden` |
| Entrées du menu plein écran | `text-[17vw]/[18vw] md:text-[190px]/[190px]` |
| Rideau de transition (« Gabi ») | `text-[12vw]/[12vw]` |
| Titres de liste (expériences About) | `text-5xl sm:text-6xl md:text-8xl` |
| Tout le texte courant, labels, boutons | `text-xs` (12 px) — `text-sm` exceptionnellement |

Le display est **toujours** dans un conteneur `overflow-hidden` d'une hauteur fixée
légèrement inférieure à l'interligne : c'est ce qui permet la révélation par masque
(section 5) et qui « coupe » visuellement les jambages.

### Micro-typographie des labels (signature du site)

Les labels en Outfit suivent des conventions de ponctuation précises — les respecter :

- **Parenthèses** pour un intitulé de section ou un surtitre : `(Gabriela Carneiro)`, `(à propos)`,
  `(expérience)`, `(role)`, `(portfolio)`, `(revenir à la page principale)`.
- **Slash** devant une catégorie ou compétence : `/Web design`, `/Branding`.
- **Crochets** pour un rôle / poste : `[Brand/ui Designer]`.
- **Compteur** entre parenthèses : `(3/6)`.
- Écrire la source en minuscules et laisser `uppercase` faire le travail.

---

## 3. Couleur

### Principe : un duo par page, inversé partout

Chaque page n'a que **deux couleurs** : un fond et une encre. Le menu, le rideau de
transition, la sélection de texte et les boutons pleins utilisent **le même duo
inversé**. Jamais de troisième couleur, à part des variantes d'opacité de l'encre.

| Page | Fond | Encre |
| --- | --- | --- |
| Home | `#F9F9F9` | `#2D2D2D` |
| À propos | `#E2FFC0` | `#1F8C0F` |
| Projet | `item.backgroundColor` | `item.textColor` (dans `src/projectList.js`) |

Duos des projets (dans `src/projectList.js`) — couleurs de la charte de chaque projet :

| Projet | Fond | Encre | Contraste |
| --- | --- | --- | --- |
| Kook | `#FFFFFF` | `#FD4800` | 3.4:1 |
| Kuchisake-Onna | `#C94B3C` | `#FFEFF0` | 4.1:1 |
| Ouroboros | `#3B3B38` | `#B3B3AD` | 5.3:1 |

Le texte courant fait 12 px : viser **4,5:1** au minimum (AA). Kook et Kuchisake-Onna
sont en dessous — choix de marque assumé, à garder en tête.

Les tokens `--color-primary` (`#E72E00`) / `--color-secondary` (`#FEF8F2`) de `@theme`
sont un reste d'un ancien projet et ne sont pas utilisés. La marque du site, c'est le gris
anthracite `#2D2D2D` sur blanc cassé `#F9F9F9`.

### Nuances autorisées

Uniquement des opacités de l'encre ou du noir/blanc :
- état hover d'une ligne : `hover:bg-black/[10%]`, `hover:text-black/80` ;
- remplissage de bouton au survol : bloc de la couleur d'encre à `opacity-15` ;
- texte secondaire sur fond coloré : `text-white/40`.

### Sélection de texte

Toujours aux couleurs de la page via la classe `custom-selection` et deux variables :

```jsx
<div className="custom-selection"
     style={{ "--selection-bg": encre, "--selection-text": fond }}>
```

---

## 4. Mise en page

- **Marges latérales** : `px-8 md:px-12` (32 → 48 px). Le footer : `mx-8 md:mx-12`.
  La navbar : `p-8 md:p-12`. C'est la seule marge du site, la tenir partout.
- **Sections plein écran** : `h-screen`. Le hero de la home est **calé en bas**
  (`justify-end`), le titre projet est sur une ligne `justify-between` :
  `(n/total)` — TITRE — `année`.
- **Page projet** : grille 12 colonnes à partir de `md`. Colonne texte
  `col-start-1 col-end-5`, `md:sticky md:top-24` ; colonne images `col-start-6 col-end-13`,
  images pleine largeur empilées en `gap-4`. En mobile : une colonne, `gap-12`.
- **Filets** plutôt que des boîtes : séparateurs de `h-[1.5px]` (épaisseur signature,
  partout : soulignés, filets de la grille projets, barres du burger), `border-t-2` pour le footer,
  `<hr className="my-6 border" />` dans les listes.
- **Arrondis** : `rounded-sm` uniquement (boutons, images). Rien de plus rond.
- **Pas de cartes-boîtes.** La seule grille de vignettes est celle des projets de la home
  (`GridProjet.jsx`), réduite à l'essentiel : l'image `rounded-sm`, puis **dessous** une
  seule ligne `NOM DU PROJET` … `/DA — année`. Ni titre display, ni description, ni filet, ni fond.
- **Page projet** : hero `(n/total)` — TITRE — `année`, `[statut]` et `/catégorie` calés en
  bas ; chaque planche est précédée d'un filet et d'une ligne `(section)` … `01/05`.
- Beaucoup de vide : laisser respirer, ne pas remplir l'espace autour du display.

---

### Responsive

- **Breakpoints utiles** : mobile < `md` (768), tablette `md`–`lg`, desktop ≥ `lg` (1024).
  Les mises en page à colonnes (page projet, entrées du menu titre + sous-titre) ne
  s'ouvrent qu'à **`lg`** : en tablette portrait, tout s'empile.
- **Display plus grand en mobile** : hero de la home à `20vw` sous `md` (`17vw` au-delà),
  titre de page projet plafonné à `24vw` sous `sm` (`14vw` au-delà).
- **Hauteurs plein écran** en `100svh` (hero) / `100dvh` (menu) plutôt que `h-screen` :
  la barre d'adresse mobile ne recouvre plus le bas.
- **Zones tactiles** : sur écran tactile (`pointer-coarse:`), les petits liens en Outfit
  reçoivent un padding vertical (~42 px de haut) ; au pointeur fin, rien ne change.
- **Accents capitales dans un masque** : dans ZT Bros Oskon, l'accent de « À »/« É » monte
  à 0,93 em, au-dessus de ce que l'interligne serré laisse dans la boîte — un masque
  `overflow-hidden` le coupe. Lui réserver ~0,13 em en `pt` (voir le menu).

## 5. Motion — la partie la plus importante

Le mouvement **est** la DA. Toute nouvelle UI doit entrer en scène, et le faire comme le
reste du site.

### Courbes et durées en place

| Nom | Valeur | Où |
| --- | --- | --- |
| **hop** (signature) | `cubic-bezier(0.9, 0, 0.1, 1)` — GSAP `CustomEase.create("hop", "0.9, 0, 0.1, 1")`, Framer `[0.9, 0, 0.1, 1]` | rideaux de transition de page (1.25–1.35 s) |
| hop « coupé » | `[0.9, 0, 0.1, 0.7]` | sortie des mots dans le rideau (0.5–0.6 s) |
| `power4.out` | GSAP | arrivée des titres display (0.8–1.3 s) |
| `power4.inOut` | GSAP | wipes clip-path, lignes, labels (1–1.2 s) |
| `power3.out` / `power2.out` | GSAP | révélation de paragraphes, suivi curseur (0.3–0.8 s) |
| Lenis | `duration: 1.2`, easing expo `1.001 - 2^(-10t)` | smooth scroll global (`LenisProvider`) |
| Hovers CSS | `transition-all duration-300` / `500` / `700` | soulignés, remplissages, burger |

Staggers : `0.1` (lignes, labels) à `0.2` (titres). Délais d'entrée `0.2–0.6 s` pour
laisser le rideau se lever d'abord.

### Les motifs à réutiliser

1. **Rideau de transition de page** — `src/components/Transition.jsx`. Chaque page monte
   `<Transition primaryColor={fond} secondaryColor={encre} />` : un plein écran de la
   couleur de la page *suivante* avec `(portfolio)` + `GABI` (`profile.brand`), qui se lève par
   `clipPath: inset(0 0 0 0) → inset(100% 0 0 0)`. Une nouvelle page doit l'avoir, et
   les liens qui y mènent doivent mettre à jour le duo (`setbgColor` / `settextColor`)
   au clic, comme le font la navbar, la grille projets et le pager préc./suiv.
2. **Révélation par masque** — parent `overflow-hidden`, enfant qui part de `y: 100%`
   (ou d'un grand `y`) vers `0`. Pour les titres display et les labels.
3. **Révélation de lignes au scroll** — ajouter la classe `reveal-line` à un texte et
   monter `<RevealText />` (`TextReveal.jsx` : SplitType en lignes + ScrollTrigger
   `start: "top 80%"`). Ne pas réécrire un système parallèle.
4. **Wipe clip-path** — overlays (menu) : `polygon(0 0,100% 0,100% 0,0 0)` →
   `polygon(0 0,100% 0,100% 100%,0 100%)`, `power4.inOut`, 1 s, puis titres en stagger.
5. **Souligné qui glisse** — hover de lien : barre `h-[1.5px]` de la couleur d'encre,
   `-translate-x-[Npx] group-hover:translate-x-0` dans un parent `overflow-hidden`
   (ou `w-0 group-hover:w-full`). C'est l'état hover par défaut de tout lien texte.
6. **Remplissage qui glisse** — hover de bouton/ligne : bloc absolu `inset-0` qui
   traverse depuis le côté (`-translate-x-[100vw] group-hover:translate-x-0`,
   `duration-700`) ou depuis le haut (bouton menu).
7. **Lignes qui se tracent** — filets qui arrivent de `x: -100vw` en stagger à l'entrée
   dans le viewport (grille projets, `IntersectionObserver`).

Pour du nouveau code, préférer `y: "100%"` à des valeurs en px (`y: 1000`) : même rendu,
indépendant de la taille du texte.

---

## 6. Composants existants — réutiliser, ne pas dupliquer

| Composant | Fichier | À savoir |
| --- | --- | --- |
| `Navbar` | `src/components/Navbar.jsx` | `index` à gauche, bouton `menu` (burger 2 barres) à droite, menu plein écran en display géant. Props : `primary` (encre), `secondary` (fond), `setbgColor`, `settextColor`. Ajouter une page = ajouter une entrée à `menuItems`. |
| `Navbar2` | `src/components/Navbar2.jsx` | Ancienne version, **non utilisée**. Ne pas s'en servir. |
| `Footer` | `src/components/Footer.jsx` | Liens nav + réseaux + email, Outfit xs, filet `border-t-2`, soulignés glissants. Prop `primaryColor`. |
| `Transition` | `src/components/Transition.jsx` | Rideau de page (voir §5). |
| `TextReveal` | `src/components/TextReveal.jsx` | Active les `.reveal-line` de la page. |
| `LenisProvider` | `src/components/LenisProvider.jsx` | Smooth scroll, déjà autour de toutes les routes. |
| `GridProjet` | `src/Home/GridProjet.jsx` | Grille des projets de la home (voir §4). Props `setbgColor`, `settextColor`. |
| `PageProjet` / `StudyTitle` | `src/ProjetPage/PageProjet.jsx` | Page projet ; `StudyTitle` ajuste le titre display à sa colonne (plafond 14 vw). |
| `ProjectPager` | `src/components/ProjectPager.jsx` | Précédent / suivant en bas de page projet, boucle : chevron + nom du projet en Outfit, souligné qui glisse. Ni titre display ni filet. |
| `MatterCubes` | — | Expérimentation non montée. Ne pas réactiver sans demande. |

### Boutons

Un seul gabarit : petit, capitales, `rounded-sm p-2 text-xs uppercase font-outfit`,
icône Heroicons outline `size-4` (ou `size-3.5`, `strokeLinecap="square"` pour les
flèches) à gauche avec `ml-2`.
- **Plein** : fond = encre, texte = fond de page, + souligné glissant au hover.
- **Contour** : `border` couleur d'encre, + remplissage glissant à `opacity-15` au hover.

---

## 7. Ton et contenu

- Français, phrases courtes, sobres. Pas de superlatifs marketing.
- Labels en Outfit capitales avec la ponctuation du §2.
- Le site présente **Gabriela Carneiro** — hero « DA / Graphiste », rideau `(portfolio)`
  + `GABI`. Coordonnées : `gabriela.carneiro@outlook.fr` et son LinkedIn (pas de téléphone sur le site). Toutes ces
  valeurs vivent dans `src/profile.js`.

---

## 8. Checklist avant de livrer une UI

- [ ] Seulement `font-ztbroskon` (énorme, capitales) et `font-outfit` (`text-xs`, capitales).
- [ ] Seulement le duo fond/encre de la page (+ opacités) ; sélection `custom-selection` réglée.
- [ ] Marges `px-8 md:px-12`, filets `1.5px`, `rounded-sm` max, ni ombre ni dégradé.
- [ ] L'élément entre en scène (masque / reveal-line / wipe) avec les courbes du §5, et
      reste en place sans animation sous `prefers-reduced-motion` (`prefersReducedMotion()`,
      `motion-reduce:`).
- [ ] Les liens ont le souligné glissant, les boutons le remplissage glissant.
- [ ] Nouvelle page : `<Transition>`, `<Navbar>`, `<Footer>`, entrée dans `menuItems`.
- [ ] Vérifié à 375, 768 et 1024 px : le display en `vw` ne déborde pas, la grille passe
      en une colonne.

---

## 9. Fontes et licences

| Fonte | Licence | Source |
| --- | --- | --- |
| Outfit | **OFL** — libre, usage commercial autorisé (`public/font/Outfit-OFL.txt`) | vault `ASSETS/FONTS/Outfit/` |
| ZT Bros Oskon 90s | **Non vérifiée** — absente du vault KNOWLEDGE | — |
| PP Neue Montreal, PP Supply Mono (`public/font/`, **non utilisées**) | **Free Personal Use** | fiches dans `~/Documents/KNOWLEDGE/ASSETS/FONTS/_FICHES/` |

Reste à vérifier : la licence de **ZT Bros Oskon**, seule fonte affichée encore incertaine
— bloquant si ce site est réalisé pour Gabriela en tant que cliente. Pour une autre typo, chercher d'abord dans le vault (voir `~/CLAUDE.md`) avant
tout téléchargement.

---

## Maintenance de ce fichier

Garde ce DESIGN.md synchronisé avec le code : nouvelle couleur de page, nouveau
composant, nouvelle courbe ou nouveau motif d'animation → mets à jour la section
concernée. Il doit décrire la DA réellement en place, pas une intention.
