// Vrai si l'utilisateur a demandé de réduire les animations : les entrées GSAP
// sont alors sautées (l'élément est directement à sa place), pas ralenties.
export const prefersReducedMotion = () =>
  typeof window !== "undefined" &&
  window.matchMedia("(prefers-reduced-motion: reduce)").matches;
