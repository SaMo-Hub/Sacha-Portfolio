import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import { profile } from "../profile";

export const Header = () => {
  const titleRefs = useRef([]);
  const subtitlesRef = useRef([]);
  titleRefs.current = [];

  useEffect(() => {
    gsap.fromTo(
      [titleRefs.current],
      { y: 1000},
      { y: 0, opacity: 1, duration: 1.2, ease: "power4.out", stagger: 0.2, delay:0.4 }
    );
    gsap.fromTo(
      [subtitlesRef.current],
      { y: 200,        opacity: 0,},
      {
        y: 0,
        opacity: 1,
        duration: 1.2,
        ease: "power4.inOut",
        stagger: 0.2,
        delay: 0.6,
      }
    );
  }, []);

  return (
    // 100svh : en mobile, la barre d'adresse ne recouvre plus le titre calé en bas.
    <div className="h-[100svh] px-8 md:px-12 flex flex-col justify-end bg-[#F9F9F9]">
      <div className="relative bottom-12">
        <div className="overflow-hidden">
        <h2 ref={subtitlesRef} className="font-outfit text-sm uppercase">({profile.fullName})</h2>
        </div>

        <div className="  flex justify-end flex-col  ">
          {/* Sous `md`, le titre passe à 20 vw pour occuper la largeur de l'écran
              (« Graphiste » n'en prenait que 80 % à 17 vw). */}
          <h1 className="text-[20vw]/[19vw] md:text-[17vw]/[16vw] flex flex-col font-ztbroskon uppercase">

            {profile.heroLines.map((line, i) => (
              <span key={line} className="overflow-hidden">
                <p ref={(el) => (titleRefs.current[i] = el)} className="h-[16.5vw] md:h-[14vw]">
                  {line}
                </p>
              </span>
            ))}
          </h1>
        </div>
      </div>
    </div>
  );
};
