import { useEffect } from "react";
import gsap from "gsap";
import SplitType from "split-type";
import ScrollTrigger from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function TextReveal({delay}) {
  useEffect(() => {
    const elements = document.querySelectorAll(".reveal-line");

    elements.forEach((el) => {
      // Sauvegarder le style original de l'élément
      const originalDisplay = el.style.display;
      const originalOverflow = el.style.overflow;
      
      const split = new SplitType(el, {
        types: "lines",
        lineClass: "line-child",
      });

      split.lines.forEach((line) => {
        const wrapper = document.createElement("div");
        wrapper.style.overflow = "hidden";
        wrapper.style.display = "inline-block"; // Changé à inline-block
        wrapper.style.verticalAlign = "top"; // Ajouté pour l'alignement
        wrapper.classList.add("line-wrapper");
        
        // Sauvegarder et réappliquer le style de la ligne
        const lineStyles = window.getComputedStyle(line);
        line.parentNode.insertBefore(wrapper, line);
        wrapper.appendChild(line);
        
        // Réappliquer les styles importants de la ligne
        wrapper.style.fontSize = lineStyles.fontSize;
        wrapper.style.lineHeight = lineStyles.lineHeight;
      });

      // Restaurer le style original de l'élément parent
      el.style.display = originalDisplay || "block";
      el.style.overflow = originalOverflow || "visible";

      gsap.set(split.lines, { 
        y: "100%", 
        opacity: 0,
        display: "inline-block" // Assure que les lignes restent alignées
      });

      gsap.to(split.lines, {
        y: "0%",
        opacity: 1,
        duration: 0.8,
        ease: "power3.out",
        delay:delay,
        stagger: 0.1,
        scrollTrigger: {
          trigger: el,
          start: "top 80%",
          toggleActions: "play none none none",
        },
      });
    });

    return () => {
      // Nettoyage éventuel
    };
  }, []);

  return null;
}