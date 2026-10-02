import React, { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { Navbar } from "../components/Navbar";
import { Footer } from "../components/Footer";
import RevealText from "../components/TextReveal";
import { Transition } from "../components/Transition";
import { profile, resume } from "../profile";
import { prefersReducedMotion } from "../hooks/reducedMotion";

// Une entrée de liste : [mention] à gauche, date à droite, nom en display masqué
function Entry({ tag, date, title }) {
  return (
    <div>
      <div className="flex gap-3 justify-between md:items-center">
        <p className="reveal-line">{`[${tag}]`}</p>
        <p className="reveal-line opacity-70 shrink-0">{date}</p>
      </div>
      <div className="overflow-hidden">
        <h3 data-about-title className="font-ztbroskon text-5xl sm:text-6xl md:text-8xl">
          {title}
        </h3>
      </div>
      <hr className="my-6 border" />
    </div>
  );
}

// Page À propos : le CV de Gabriela. Colonne gauche collée (présentation,
// centres d'intérêt), colonne droite en listes « [poste] / date / NOM » séparées
// par des filets — expériences, scolarité, compétences.
export const About = () => {
  // Duo de la page (maquette Figma « À propos », node 91:2946) : encre / fond
  const primaryColor = "#1F8C0F";
  const secondaryColor = "#E2FFC0";
  const [bgColor, setbgColor] = useState(primaryColor);
  const [textColor, settextColor] = useState(secondaryColor);
  const pageRef = useRef(null);

  // Les noms en display sortent de leur masque une fois le rideau levé
  useEffect(() => {
    if (prefersReducedMotion()) return;
    gsap.fromTo(
      pageRef.current.querySelectorAll("[data-about-title]"),
      { yPercent: 100 },
      { yPercent: 0, duration: 1.2, ease: "power4.out", stagger: 0.1, delay: 0.4 }
    );
  }, []);

  return (
    <div
      style={{
        "--selection-bg": primaryColor,
        "--selection-text": secondaryColor,
        background: secondaryColor,
        color: primaryColor,
      }}
      ref={pageRef}
      className="custom-selection h-full flex flex-col justify-between"
    >
      <Transition primaryColor={bgColor} secondaryColor={textColor} />
      <RevealText delay={0.5} />
      <Navbar
        setbgColor={setbgColor}
        settextColor={settextColor}
        primary={primaryColor}
        secondary={secondaryColor}
      />

      <div className="gap-32 lg:gap-12 pt-32 flex lg:flex-row flex-col md:justify-between font-supply text-xs px-8 md:px-12 h-full">
        <div className="flex lg:sticky top-24 self-start flex-col gap-16">
          <div className="flex flex-col gap-8">
            <h2 className="reveal-line uppercase">(à propos)</h2>
            <div className="md:w-[50%] lg:w-[250px] flex flex-col gap-4">
              <p className="reveal-line uppercase">
                {`${profile.fullName} — [${profile.role}]`}
              </p>
              {resume.intro.map((paragraph) => (
                <p key={paragraph} className="reveal-line">
                  {paragraph}
                </p>
              ))}
            </div>
          </div>

          <div className="uppercase flex flex-col gap-2">
            <h2 className="reveal-line">(centres d'intérêt)</h2>
            <div>
              {resume.interests.map((interest) => (
                <p key={interest} className="reveal-line">
                  {`/${interest}`}
                </p>
              ))}
            </div>
          </div>
        </div>

        <div className="uppercase flex flex-col gap-24 lg:w-[60%]">
          <section className="flex flex-col gap-8">
            <h2 className="reveal-line">(expérience)</h2>
            <div>
              {resume.experiences.map((item) => (
                <Entry key={item.company} tag={item.role} date={item.period} title={item.company} />
              ))}
            </div>
          </section>

          <section className="flex flex-col gap-8">
            <h2 className="reveal-line">(scolarité)</h2>
            <div>
              {resume.education.map((item) => (
                <Entry key={item.school} tag={item.detail} date={item.period} title={item.school} />
              ))}
            </div>
          </section>

          <section className="flex flex-col gap-8">
            <h2 className="reveal-line">(compétences)</h2>
            <div className="grid sm:grid-cols-2 gap-8">
              <div className="flex flex-col gap-2">
                <p className="reveal-line">(outils)</p>
                <div>
                  {resume.tools.map((tool) => (
                    <p key={tool} className="reveal-line">
                      {`/${tool}`}
                    </p>
                  ))}
                </div>
              </div>
              <div className="flex flex-col gap-2">
                <p className="reveal-line">(langues)</p>
                <div>
                  {resume.languages.map((language) => (
                    <p key={language.label} className="reveal-line">
                      {`/${language.label} (${language.level}/${resume.levelMax})`}
                    </p>
                  ))}
                </div>
                <p className="reveal-line mt-4">[permis b]</p>
              </div>
            </div>
          </section>
        </div>
      </div>
      <Footer primaryColor={primaryColor} />
    </div>
  );
};
