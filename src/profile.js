// Identité et CV de Gabriela Carneiro — source unique du hero, du rideau de
// transition, du footer et de la page À propos. Le texte est écrit en minuscules
// ou en casse normale : c'est `uppercase` qui fait le travail (DESIGN.md §2).

export const profile = {
  firstName: "Gabriela",
  fullName: "Gabriela Carneiro",
  // Mot du rideau de transition (display géant)
  brand: "Gabi",
  role: "Direction artistique & graphisme",
  // Hero de la home, une entrée par ligne masquée
  heroLines: ["DA /", "Graphiste"],
  email: "gabriela.carneiro@outlook.fr",
  linkedin: "https://www.linkedin.com/in/gabriela-carneiro-a5a3a2248/",
};

export const resume = {
  // Texte du CV d'origine — ne pas inventer de bio à la place de Gabriela
  intro: ["En recherche active d'une alternance, pour septembre 2026."],
  interests: ["dessin", "graphisme", "cuisine", "musique"],
  experiences: [
    { company: "Le Studio", role: "Alternance Community Manager", period: "2025 - 2026" },
    { company: "Ican Design", role: "Stage chargée de projets numériques", period: "2025" },
    { company: "Foncia", role: "Alternance assistante gestionnaire", period: "2023 - 2024" },
    { company: "R.Durand", role: "Alternance conseillère en location", period: "2022 - 2023" },
  ],
  education: [
    {
      school: "ICAN Design",
      detail: "Bachelor webdesign et graphisme — Paris",
      period: "2024 - 2027",
    },
    {
      school: "Isifa Plus Values",
      detail: "BTS professions immobilières — Levallois-Perret",
      period: "2022 - 2024",
    },
    {
      school: "Baccalauréat",
      detail: "Général, mention assez bien — Argenteuil",
      period: "2022",
    },
  ],
  tools: ["figma", "photoshop", "illustrator", "indesign", "after effects", "buffer"],
  // Niveau sur 4, comme dans le CV d'origine
  languages: [
    { label: "français", level: 4 },
    { label: "portugais", level: 4 },
    { label: "anglais", level: 2 },
  ],
  levelMax: 4,
};
