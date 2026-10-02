import React from "react";
import { Link } from "react-router";
import { projectList } from "../projectList";

/**
 * Bas d'une page projet : projet précédent / suivant.
 *
 * La liste **boucle** : les deux directions sont toujours disponibles, on parcourt
 * le portfolio sans repasser par la home.
 *
 * Chaque côté est un simple lien mono : chevron + nom du projet, avec le
 * **souligné qui glisse** au survol (DESIGN.md §5, motif 5). Pas de titre display
 * ni de filet : le pager reste discret sous les planches.
 *
 * Tout est en `currentColor` : le pager hérite de l'encre de la page.
 *
 * - `slug` : projet affiché.
 * - `onNavigate(project)` : met à jour le duo du rideau avant la navigation.
 */
export const ProjectPager = ({ slug, onNavigate }) => {
  const index = projectList.findIndex((p) => p.slug === slug);
  if (index === -1 || projectList.length < 2) return null;

  const previous = projectList[(index - 1 + projectList.length) % projectList.length];
  const next = projectList[(index + 1) % projectList.length];

  return (
    <nav
      aria-label="Autres projets"
      className="mt-32 md:mt-44 px-8 md:px-12 flex justify-between gap-6 font-supply text-xs uppercase"
    >
      <PagerLink project={previous} label="Projet précédent" onNavigate={onNavigate} />
      <PagerLink project={next} label="Projet suivant" isNext onNavigate={onNavigate} />
    </nav>
  );
};

function PagerLink({ project, label, isNext = false, onNavigate }) {
  const title = project.study.title;
  return (
    // `min-h-[44px]` : zone tactile confortable autour d'un texte de 12 px.
    // Le sens (précédent / suivant) n'étant plus écrit, il passe par `aria-label`.
    <Link
      to={`/projets/${project.slug}`}
      onClick={() => onNavigate(project)}
      aria-label={`${label} : ${title}`}
      className="group flex min-h-[44px] items-center gap-2"
    >
      {!isNext && <Chevron direction="left" />}
      <span className="relative overflow-hidden">
        {title}
        <span className="absolute left-0 bottom-0 h-[1.5px] w-full bg-current -translate-x-full group-hover:translate-x-0 group-focus-visible:translate-x-0 transition-transform duration-500 motion-reduce:transition-none" />
      </span>
      {isNext && <Chevron direction="right" />}
    </Link>
  );
}

// Chevron Heroicons outline, extrémités carrées comme les flèches du site
function Chevron({ direction }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      strokeWidth={2.5}
      stroke="currentColor"
      aria-hidden="true"
      className="size-3.5"
    >
      <path
        strokeLinecap="square"
        strokeLinejoin="square"
        d={direction === "left" ? "M15.75 19.5 8.25 12l7.5-7.5" : "m8.25 4.5 7.5 7.5-7.5 7.5"}
      />
    </svg>
  );
}
