import React, { useState, useRef, useEffect } from "react";
import { projectList } from "../projectList";
import { Link } from "react-router";
import gsap from "gsap";

export const Rolodex = () => {
  const [hoveredIndex, setHoveredIndex] = useState(null);
  const containerRef = useRef(null);
  const imageContainerRef = useRef(null);
  const imageListRef = useRef(null);

  // Suivre la souris pour animer la position de l'image
  useEffect(() => {
    const moveImage = (e) => {
      if (imageContainerRef.current) {
        gsap.to(imageContainerRef.current, {
          duration: 0.4,
          x: e.clientX - 150,
          y: e.clientY - 150,
          ease: "power2.out",
        });
      }
    };

    const container = containerRef.current;
    if (container) {
      container.addEventListener("mousemove", moveImage);
    }

    return () => {
      if (container) {
        container.removeEventListener("mousemove", moveImage);
      }
    };
  }, []);

  // Animation de slide + scale/fade quand on hover ou quitte
  useEffect(() => {
    if (hoveredIndex !== null) {
      gsap.to(imageContainerRef.current, {
        scale: 1,
        opacity: 1,
        duration: 0.3,
        ease: "power2.out",
        pointerEvents: "none",
      });

      gsap.to(imageListRef.current, {
        duration: 0.4,
        y: -hoveredIndex * 300,
        ease: "power2.out",
      });
    } else {
      gsap.to(imageContainerRef.current, {
        // scale: 0.8,
        opacity: 0,
        duration: 0.3,
        ease: "power2.out",
      });
    }
  }, [hoveredIndex]);

  return (
    <div
      ref={containerRef}
      className="h-screen px-12 w-full flex flex-col justify-center items-center relative bg-amber"
    >
      <div
        ref={imageContainerRef}
        className="absolute h-[300px] z-20 overflow-hidden pointer-events-none"
        style={{ top: 0, left: 0, opacity: 0, transform: "scale(0.8)" }}
      >
        <div ref={imageListRef}>
          {projectList.map((item, index) => (
            <div key={index}>
              <img
                className="h-[300px] relative z-20"
                src={item.listImage[1].img}
                alt=""
              />
            </div>
          ))}
        </div>
      </div>

      <div className="w-full">
        {projectList.map((item, index) => (
          <Link
            key={item.id}
            className="w-full relative z-10 "
            to={`/projets/${item.id}`}
            onMouseEnter={() => setHoveredIndex(index)}
            onMouseLeave={() => setHoveredIndex(null)}
          >
            <div className="flex items-center w-full hover:bg-black/[2%] hover:text-black/40 uppercase pt-3 pb-18 border-t justify-between font-supply text-xs">
              <p>date : {item.date}</p>
              <p>categorie : {item.categorie}</p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};
