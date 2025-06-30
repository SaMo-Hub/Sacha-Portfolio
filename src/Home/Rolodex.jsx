import React, { useState, useRef, useEffect } from "react";
import { projectList } from "../projectList";
import { Link } from "react-router";
import gsap from "gsap";

export const Rolodex = ({ setbgColor, settextColor,}) => {
  const [hoveredIndex, setHoveredIndex] = useState(null);
  const containerRef = useRef(null);
  const imageContainerRef = useRef(null);
  const imageListRef = useRef(null);
  const strokeRef = useRef([]);
  const dateRef = useRef([]);
  const skillRef = useRef([]);
  const animationContainerRef = useRef(null);
const [isVisible, setIsVisible] = useState(false);

useEffect(() => {
  const observer = new IntersectionObserver(
    ([entry]) => {
      if (entry.isIntersecting) {
        setIsVisible(true);
        observer.disconnect(); // Stop observing après la première apparition
      }
    },
    {
      threshold: 0.3, // 30% visible
    }
  );

  if (animationContainerRef.current) {
    observer.observe(animationContainerRef.current);
  }

  return () => observer.disconnect();
}, []);

  useEffect(() => {
  if (!isVisible) return;

  gsap.fromTo(
    [strokeRef.current],
    { x: "-100vw" },
    {
      x: 0,
      duration: 1,
      ease: "power4.inOut",
      stagger: 0.1,
    }
  );

  gsap.fromTo(
    [dateRef.current],
    { y: 200, opacity: 0 },
    {
      y: 0,
      opacity: 1,
      duration: 1.2,
      ease: "power4.inOut",
      stagger: 0.1,
    }
  );

  gsap.fromTo(
    [skillRef.current],
    { y: 200, opacity: 0 },
    {
      y: 0,
      opacity: 1,
      duration: 1.2,
      ease: "power4.inOut",
      stagger: 0.1,
      delay: 0.2,
    }
  );
}, [isVisible]);

  // Suivre la souris pour animer la position de l'image
  useEffect(() => {
//     gsap.fromTo(
//       [strokeRef.current],
//       { x: -1200 },
//       {
//         x: 0,
//         duration: 1,
//         ease: "power4.inOut",
//         stagger: 0.15,
//       }
//     );
// gsap.fromTo(
//       [dateRef.current],
//       { y: 200,        opacity: 0,},
//       {
//         y: 0,
//         opacity: 1,
//         duration: 1.2,
//         ease: "power4.inOut",
//         stagger: 0.1,
//         // delay: 0.2,
//       }
//     );
// gsap.fromTo(
//       [skillRef.current],
//       { y: 200,        opacity: 0,},
//       {
//         y: 0,
//         opacity: 1,
//         duration: 1.2,
//         ease: "power4.inOut",
//         stagger: 0.1,
//         delay: 0.2,
        
//       }
    // );
    const moveImage = (e) => {
      if (imageContainerRef.current && containerRef.current) {
        const containerBounds = containerRef.current.getBoundingClientRect();

        const mouseX = e.clientX - containerBounds.left;
        const mouseY = e.clientY - containerBounds.top;

        const imageWidth = 300; // ou dynamique via `imageContainerRef.current.offsetWidth`
        gsap.to(imageContainerRef.current, {
          duration: 0.4,
          x: mouseX - imageWidth / 2,
          y: mouseY - imageWidth / 2,
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
      className="h-screen overflow-hidden px-12 w-full flex flex-col justify-center items-center relative bg-amber"
    >
      <div
        ref={imageContainerRef}
        className="absolute  h-[300px] z-20 overflow-hidden pointer-events-none"
        style={{ top: 0, left: 0, opacity: 0, transform: "scale(0.8)" }}
      >
        <div className="overflow-hidden" ref={imageListRef}>
          {projectList.map((item, index) => (
            <div key={index}>
              <img
                className="h-[300px]  relative z-20"
                src={item.thumbnail}
                alt=""
              />
            </div>
          ))}
        </div>
      </div>

      <div ref={animationContainerRef} className="w-full">
        {projectList.map((item, index) => (
          <Link
          
            key={index}
            className="w-full overflow-hidden relative z-10 "
            to={`/projets/${item.id}`}
            onMouseEnter={() => setHoveredIndex(index)}
            onMouseLeave={() => setHoveredIndex(null)}
          >
            <div 
            onClick={()=> {setbgColor(item.textColor),settextColor(item.backgroundColor)}}
            className="overflow-hidden">
              <div
                ref={(el) => (strokeRef.current[index] = el)}
                className="h-[1px] -translate-x-[100vw]   w-full bg-black"
              ></div>
              <div className="transition-all flex flex-col sm:flex-row sm:items-center flex-wrap w-full hover:bg-black/[10%] hover:text-black/80 uppercase pt-3 pb-18 bord-t gap-4 sm:justify-between font-supply text-xs">
                <div
               
                  className="overflow-hidden bg-amber-"
                >
                  <p  className="translate-y-[20px]" ref={(el) => (dateRef.current[index] = el)}>{item.title}</p>
                </div>
                <div
                  className="flex bg-amber50 overflow-hidden flex-wrap"
                >
                  <div    className="flex bg-ambe-50 overflow-hidden flex-wrap translate-y-[20px]"              ref={(el) => (skillRef.current[index] = el)}
>

                  <p className="min-w-fit ">categorie :</p>
                  <div className="min-w-fit flex gap-3">
                    {item.categorie.map((item, index) => (
                      <p id={index}>/{item} </p>
                    ))}
                  </div>
                    </div>
                </div>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};
