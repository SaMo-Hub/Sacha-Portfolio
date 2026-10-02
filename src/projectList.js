// Données de tous les projets — la grille de la home et les pages projet en dépendent.
// L'ordre du tableau est celui de la grille, du compteur « (n/total) » et du pager
// (qui boucle). L'URL d'une page projet est `/projets/<slug>`.
//
// Chaque projet a son duo `backgroundColor` / `textColor` (voir DESIGN.md §3) : fond
// et encre de sa page, inversés pour le rideau de transition et la sélection de texte.
// Duos tirés de la charte de chaque projet, contraste ≥ 7:1 (le texte courant est en
// 12 px).
//
// `study.sections` : une section = une planche (`image`) ou plusieurs empilées
// (`images`). Les planches sont des exports SVG Figma déjà optimisés
// (voir « Planches de charte » dans CLAUDE.md).

import cardKook from "./assets/projets/card-kook.png";
import cardKuchisake from "./assets/projets/card-kuchisake.png";
import cardOuroboros from "./assets/projets/card-ouroboros.png";

import kookLogo from "./assets/projets/kook/logo.svg";
import kookMascotteHero from "./assets/projets/kook/mascotte-hero.svg";
import kookMascottePoses from "./assets/projets/kook/mascotte-poses.svg";
import kookCouleurs from "./assets/projets/kook/couleurs.svg";
import kookTypo from "./assets/projets/kook/typo.svg";
import kookIcones from "./assets/projets/kook/icones.svg";
import kookPrototype from "./assets/projets/kook/prototype.svg";

import kuchiLogo from "./assets/projets/kuchisake/logo.svg";
import kuchiLogoDecl from "./assets/projets/kuchisake/logo-decl.svg";
import kuchiCouleurs from "./assets/projets/kuchisake/couleurs.svg";
import kuchiTypo from "./assets/projets/kuchisake/typo.svg";
import kuchiAffiche from "./assets/projets/kuchisake/affiche.svg";
import kuchiMockup from "./assets/projets/kuchisake/mockup.svg";

import ouroTypo from "./assets/projets/ouroboros/typo.svg";
import ouroCouleurs from "./assets/projets/ouroboros/couleurs.svg";
import ouroVisuels from "./assets/projets/ouroboros/visuels.svg";

export const projectList = [
  {
    slug: "kook",
    title: "Kook - Planifiez, cuisinez, économisez",
    description:
      "Une DA créée pour une application de batch cooking pensée pour aider les étudiants et les jeunes actifs à organiser leurs repas, maîtriser leur budget et cuisiner plus sereinement.",
    image: cardKook,
    backgroundColor: "#FFFFFF",
    textColor: "#FD4800",
    study: {
      title: "Kook",
      year: "2026",
      category: "DA",
      status: "En cours",
      context:
        "L'application est centrée sur le batch cooking et propose une planification des repas, des recettes personnalisées ainsi qu'une liste de courses générée automatiquement afin de simplifier la préparation des repas tout au long de la semaine.",
      sections: [
        { id: "logo", title: "Logo", type: "image", image: kookLogo },
        {
          id: "mascotte",
          title: "Mascotte",
          type: "images",
          images: [kookMascotteHero, kookMascottePoses],
        },
        { id: "couleurs", title: "Couleurs", type: "image", image: kookCouleurs },
        { id: "typographie", title: "Typographie", type: "image", image: kookTypo },
        { id: "icones", title: "Icônes", type: "image", image: kookIcones },
        { id: "prototype", title: "Prototype", type: "image", image: kookPrototype },
      ],
    },
  },
  {
    slug: "kuchisake-onna",
    title: "Kuchisake-Onna",
    description:
      "Une expérience immersive présentée à la Maison de la Culture du Japon, cette identité visuelle s'inspire de la légende de Kuchisake-Onna, l'un des fantômes les plus emblématiques du folklore japonais.",
    image: cardKuchisake,
    backgroundColor: "#C94B3C",
    textColor: "#FFEFF0",
    study: {
      title: "Kuchisake-Onna",
      year: "2025",
      category: "DA",
      status: "En cours",
      context:
        "Une expérience immersive présentée à la Maison de la Culture du Japon, cette identité visuelle s'inspire de la légende de Kuchisake-Onna, l'un des fantômes les plus emblématiques du folklore japonais.",
      sections: [
        {
          id: "mascotte",
          title: "Mascotte",
          type: "images",
          images: [kuchiLogo, kuchiLogoDecl],
        },
        { id: "couleurs", title: "Couleurs", type: "image", image: kuchiCouleurs },
        { id: "typographie", title: "Typographie", type: "image", image: kuchiTypo },
        { id: "affiche", title: "Affiche", type: "image", image: kuchiAffiche },
        { id: "mockup", title: "Mockup", type: "image", image: kuchiMockup },
      ],
    },
  },
  {
    slug: "ouroboros",
    title: "Ouroboros",
    description:
      "DA conçue autour de la typographie Ouroboros, inspirée de l'astrologie, de l'astronomie et de l'alchimie, afin de créer une expérience web immersive où la typographie devient le cœur de la narration visuelle.",
    image: cardOuroboros,
    backgroundColor: "#3B3B38",
    textColor: "#B3B3AD",
    study: {
      title: "Ouroboros",
      year: "2024",
      category: "DA",
      status: "En cours",
      context:
        "DA conçue autour de la typographie Ouroboros, inspirée de l'astrologie, de l'astronomie et de l'alchimie, afin de créer une expérience web immersive où la typographie devient le cœur de la narration visuelle.",
      sections: [
        { id: "typographie", title: "Typographie", type: "image", image: ouroTypo },
        { id: "couleurs", title: "Couleurs", type: "image", image: ouroCouleurs },
        { id: "visuels", title: "Visuels", type: "image", image: ouroVisuels },
      ],
    },
  },
];

export const projectsBySlug = Object.fromEntries(projectList.map((p) => [p.slug, p]));
