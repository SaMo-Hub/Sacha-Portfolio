import React, { useEffect, useRef } from "react";
import { Link } from "react-router";
import gsap from "gsap";
import { projectList } from "../projectList";
import { prefersReducedMotion } from "../hooks/reducedMotion";

// Grille des projets de la home — 1 colonne en mobile, 3 à partir de `md`.
// Chaque carte est **un seul lien** vers `/projets/<slug>` : une seule cible
// focusable. Au clic, le duo du rideau prend les couleurs du projet (encre en
// fond), comme le reste du site.
//
// Carte minimale : l'image, puis nom du projet, catégorie et année en mono
// dessous — ni titre display, ni description, ni filet.
//
// Entrée (au premier passage dans le viewport) : l'image se dévoile par le bas,
// puis les labels montent de leur masque.
export const GridProjet = ({ setbgColor, settextColor }) => {
  const sectionRef = useRef(null);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section || prefersReducedMotion()) return;

    const q = gsap.utils.selector(section);
    gsap.set(q("[data-mask]"), { yPercent: 100 });
    gsap.set(q("[data-image]"), { clipPath: "inset(100% 0% 0% 0%)" });

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        observer.disconnect();

        gsap.to(q("[data-image]"), {
          clipPath: "inset(0% 0% 0% 0%)",
          duration: 1.2,
          ease: "power4.inOut",
          stagger: 0.1,
        });
        gsap.to(q("[data-mask]"), {
          yPercent: 0,
          duration: 1.2,
          ease: "power4.out",
          stagger: 0.05,
          delay: 0.4,
        });
      },
      { threshold: 0.15 }
    );
    observer.observe(section);

    return () => observer.disconnect();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="projets"
      className="px-8 md:px-12 pt-24 md:pt-32 font-supply text-xs"
    >
      <div className="flex justify-between uppercase mb-6">
        <div className="overflow-hidden">
          <h2 data-mask>(projets)</h2>
        </div>
        <div className="overflow-hidden">
          <p data-mask>({projectList.length})</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-x-4 gap-y-16">
        {projectList.map((project) => (
          <Link
            key={project.slug}
            to={`/projets/${project.slug}`}
            onClick={() => {
              setbgColor(project.textColor);
              settextColor(project.backgroundColor);
            }}
            className="group flex flex-col gap-3"
          >
            {/* L'image a ses coins arrondis cuits dans l'export : `rounded-sm`
                ne fait que nettoyer le bord du zoom au survol. */}
            <div data-image className="overflow-hidden rounded-sm">
              <img
                src={project.image}
                alt={project.title}
                loading="lazy"
                width="849"
                height="1075"
                className="aspect-[424/537] h-auto w-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.03] motion-reduce:transition-none motion-reduce:group-hover:scale-100"
              />
            </div>

            <div className="flex justify-between gap-4 uppercase">
              <div className="overflow-hidden">
                <p data-mask>{project.study.title}</p>
              </div>
              <div className="overflow-hidden">
                <p data-mask>
                  /{project.study.category} — {project.study.year}
                </p>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
};
