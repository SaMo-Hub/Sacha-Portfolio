import React, { useEffect, useRef, useState } from "react";
import { Navigate, useParams } from "react-router";
import gsap from "gsap";
import { projectList, projectsBySlug } from "../projectList";
import { Navbar } from "../components/Navbar";
import { Footer } from "../components/Footer";
import { Transition } from "../components/Transition";
import RevealText from "../components/TextReveal";
import ScrollToTop from "../components/ScrollTop";
import { ProjectPager } from "../components/ProjectPager";
import { useFitText } from "../hooks/useFitText";
import { prefersReducedMotion } from "../hooks/reducedMotion";

// Route `/projets/:slug`. Un slug inconnu (dont les anciennes URL `/projets/1`…)
// renvoie à la home plutôt que d'afficher une page vide.
export const PageProjet = () => {
  const { slug } = useParams();
  const project = projectsBySlug[slug];
  if (!project) return <Navigate to="/" replace />;
  return <ProjectView key={slug} project={project} />;
};

// Morceaux insécables d'un titre : les mots, et ce qui suit un trait d'union
// (« Kuchisake-Onna » → « Kuchisake- » + « Onna »). Ce sont les endroits où le
// navigateur a le droit de passer à la ligne.
function chunksOf(title) {
  return String(title)
    .split(/\s+/)
    .flatMap((word) => word.match(/[^-]*-|[^-]+/g) ?? [word]);
}

/**
 * Titre display du hero, ajusté à la colonne que lui laissent le compteur et
 * l'année.
 *
 * On ne mesure pas le titre entier mais son **morceau le plus large** : la taille
 * est celle qui fait tenir ce morceau dans la colonne, et c'est ensuite le
 * navigateur qui passe à la ligne si le titre complet ne tient pas. Un nom court
 * reste sur une ligne ; un nom long (« Kuchisake-Onna ») passe sur deux lignes au
 * lieu de rapetisser ou de déborder sur l'année.
 *
 * Le plafond est l'échelle du display du site, **14 vw** (DESIGN.md §2), appliqué
 * en CSS par `min()` : il suit la fenêtre sans remesurer. Sous `sm`, le compteur et
 * l'année passent sous le titre, qui a toute la largeur : plafond relevé à 24 vw.
 */
function StudyTitle({ children }) {
  const [boxRef, probeRef, size] = useFitText({ fill: 1 });
  const chunks = chunksOf(children);

  return (
    // `boxRef` ne porte aucun padding : sa largeur EST la place disponible.
    <div ref={boxRef} className="relative w-full">
      {/* Sonde de mesure, hors flux : sa largeur est celle du plus large morceau
          (chaque morceau est un bloc insécable). */}
      <span
        ref={probeRef}
        aria-hidden="true"
        className="font-ztbroskon uppercase invisible absolute left-0 top-0 whitespace-nowrap"
      >
        {chunks.map((chunk, i) => (
          <span key={`${chunk}-${i}`} className="block">
            {chunk}
          </span>
        ))}
      </span>

      {/* Masque de révélation : le titre monte de sous la ligne */}
      <div className="overflow-hidden">
        <h1
          data-hero-mask
          className="font-ztbroskon uppercase [--title-cap:24vw] sm:[--title-cap:14vw]"
          style={{
            fontSize: size ? `min(${size}px, var(--title-cap))` : undefined,
            lineHeight: 0.9,
            visibility: size ? undefined : "hidden",
          }}
        >
          {children}
        </h1>
      </div>
    </div>
  );
}

// Une section de la charte : une planche, ou plusieurs empilées.
function SectionContent({ section }) {
  const images = section.type === "images" ? section.images : [section.image];
  return (
    <div className="flex flex-col gap-4">
      {images.map((src, i) => (
        <img
          key={src}
          data-reveal-image
          src={src}
          alt={images.length > 1 ? `${section.title} ${i + 1}` : section.title}
          loading="lazy"
          className="h-auto w-full rounded-sm"
        />
      ))}
    </div>
  );
}

// Label mono masqué, monté avec le hero
function HeroLabel({ children, className = "" }) {
  return (
    <div className={`overflow-hidden ${className}`}>
      <p data-hero-mask className="font-supply text-xs uppercase">
        {children}
      </p>
    </div>
  );
}

function ProjectView({ project }) {
  const { study, backgroundColor, textColor } = project;
  const position = projectList.indexOf(project) + 1;
  const counter = `(${position}/${projectList.length})`;
  const pad = (n) => String(n).padStart(2, "0");

  // Duo du rideau de transition (fond, texte) : l'encre du projet en fond, mis à
  // jour au clic sur un lien pour prendre les couleurs de la page de destination.
  const [bgColor, setbgColor] = useState(textColor);
  const [curtainText, settextColor] = useState(backgroundColor);

  const heroRef = useRef(null);
  const sectionsRef = useRef(null);

  // Entrée du hero : laisse le rideau se lever, puis titres et labels sortent
  // de leur masque.
  useEffect(() => {
    if (prefersReducedMotion()) return;
    const targets = heroRef.current.querySelectorAll("[data-hero-mask]");
    gsap.fromTo(
      targets,
      { yPercent: 100 },
      { yPercent: 0, duration: 1.3, ease: "power4.out", stagger: 0.1, delay: 0.3 }
    );
  }, []);

  // Planches : dévoilement par le bas au premier passage dans le viewport.
  // IntersectionObserver plutôt que ScrollTrigger : les SVG chargés en lazy
  // changent la hauteur de la page, ce qui fausserait des déclencheurs précalculés.
  useEffect(() => {
    if (prefersReducedMotion()) return;
    const images = sectionsRef.current.querySelectorAll("[data-reveal-image]");
    gsap.set(images, { clipPath: "inset(100% 0% 0% 0%)" });

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          observer.unobserve(entry.target);
          gsap.to(entry.target, {
            clipPath: "inset(0% 0% 0% 0%)",
            duration: 1.2,
            ease: "power4.inOut",
          });
        });
      },
      { rootMargin: "0px 0px -10% 0px" }
    );
    images.forEach((img) => observer.observe(img));

    return () => observer.disconnect();
  }, []);

  // Sommaire : défilement doux vers la planche, instantané si l'utilisateur
  // préfère réduire les animations.
  const goToSection = (event, id) => {
    event.preventDefault();
    document.getElementById(id)?.scrollIntoView({
      behavior: prefersReducedMotion() ? "auto" : "smooth",
      block: "start",
    });
  };

  return (
    <div
      className="custom-selection min-h-screen"
      style={{
        backgroundColor,
        color: textColor,
        "--selection-bg": textColor,
        "--selection-text": backgroundColor,
      }}
    >
      <Transition primaryColor={bgColor} secondaryColor={curtainText} />
      <RevealText />
      <ScrollToTop />
      <Navbar
        setbgColor={setbgColor}
        settextColor={settextColor}
        primary={textColor}
        secondary={backgroundColor}
      />

      {/* Hero — compteur · TITRE · année. Les deux mentions sont **dans le flux**
          (même largeur minimale, pour que la colonne du titre reste centrée) et
          non posées par-dessus : un nom long ne peut pas leur passer dessus.
          `min-w-0` sur la colonne du titre est indispensable : sans lui, un
          élément flex refuse de descendre sous sa largeur naturelle. */}
      <header
        ref={heroRef}
        className="relative h-[100svh] px-8 md:px-12 flex flex-col justify-center"
      >
        <div className="flex w-full items-center gap-6 md:gap-10">
          <HeroLabel className="hidden sm:block min-w-[80px] shrink-0">{counter}</HeroLabel>
          <div className="min-w-0 flex-1 text-center">
            <StudyTitle>{study.title}</StudyTitle>
          </div>
          <HeroLabel className="hidden sm:block min-w-[80px] shrink-0 text-right">
            {study.year}
          </HeroLabel>
        </div>

        {/* En mobile, les mentions passent sous le titre */}
        <div className="sm:hidden mt-6 flex justify-between">
          <HeroLabel>{counter}</HeroLabel>
          <HeroLabel>{study.year}</HeroLabel>
        </div>

        <div className="absolute inset-x-8 md:inset-x-12 bottom-8 md:bottom-12 flex justify-between">
          <HeroLabel>[{study.status}]</HeroLabel>
          <HeroLabel>/{study.category}</HeroLabel>
        </div>
      </header>

      {/* Deux colonnes à partir de `lg` seulement : en tablette portrait, la colonne
          des planches ne faisait que ~380 px. En dessous, texte puis planches. */}
      <div className="px-8 md:px-12 flex flex-col gap-24 lg:grid lg:grid-cols-12 lg:gap-4">
        {/* Colonne texte, collée pendant le défilement des planches */}
        <aside className="lg:col-start-1 lg:col-end-5 lg:sticky lg:top-28 self-start font-supply text-xs flex flex-col gap-12">
          <div className="uppercase flex flex-col gap-2">
            <p className="reveal-line">(rôle)</p>
            <p className="reveal-line">{`/${study.category}`}</p>
          </div>

          <div className="flex flex-col gap-2">
            <p className="reveal-line uppercase">(contexte)</p>
            <p className="reveal-line max-w-[46ch]">{study.context}</p>
          </div>

          <nav aria-label="Sommaire du projet" className="uppercase flex flex-col gap-2">
            <p className="reveal-line">(sommaire)</p>
            <ul>
              {study.sections.map((section, i) => (
                <li key={section.id}>
                  <a
                    href={`#${section.id}`}
                    onClick={(event) => goToSection(event, section.id)}
                    className="group relative inline-flex gap-3 py-2.5 lg:py-1"
                  >
                    <span className="opacity-60">{pad(i + 1)}</span>
                    <span className="relative overflow-hidden">
                      {section.title}
                      <span className="absolute left-0 bottom-0 h-[1.5px] w-full bg-current -translate-x-full group-hover:translate-x-0 group-focus-visible:translate-x-0 transition-transform duration-500 motion-reduce:transition-none" />
                    </span>
                  </a>
                </li>
              ))}
            </ul>
          </nav>
        </aside>

        {/* Planches de la charte */}
        <main
          ref={sectionsRef}
          className="lg:col-start-6 lg:col-end-13 flex flex-col gap-24 md:gap-32"
        >
          {study.sections.map((section, i) => (
            <section key={section.id} id={section.id} className="scroll-mt-28">
              <div className="flex justify-between font-supply text-xs uppercase pt-3 pb-6 relative">
                <div className="h-[1.5px] w-full bg-current absolute top-0 left-0" />
                <h2 className="reveal-line">{`(${section.title})`}</h2>
                <p className="reveal-line">{`${pad(i + 1)}/${pad(study.sections.length)}`}</p>
              </div>
              <SectionContent section={section} />
            </section>
          ))}
        </main>
      </div>

      <ProjectPager
        slug={project.slug}
        onNavigate={(next) => {
          setbgColor(next.textColor);
          settextColor(next.backgroundColor);
        }}
      />

      <Footer primaryColor={textColor} />
    </div>
  );
}
