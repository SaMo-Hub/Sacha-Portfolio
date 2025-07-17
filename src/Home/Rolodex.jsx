import React, { useState, useRef, useEffect } from "react";
import { projectList } from "../projectList";
import { Link } from "react-router";
import gsap from "gsap";

export const Rolodex = ({ setbgColor, settextColor }) => {
  const [hoveredIndex, setHoveredIndex] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState(null);
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
          observer.disconnect();
        }
      },
      { threshold: 0.3 }
    );

    if (animationContainerRef.current) {
      observer.observe(animationContainerRef.current);
    }

    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!isVisible) return;

    gsap.fromTo(strokeRef.current, { x: "-100vw" }, {
      x: 0,
      duration: 1,
      ease: "power4.inOut",
      stagger: 0.1
    });

    gsap.fromTo(dateRef.current, { y: 200, opacity: 0 }, {
      y: 0,
      opacity: 1,
      duration: 1.2,
      ease: "power4.inOut",
      stagger: 0.1
    });

    gsap.fromTo(skillRef.current, { y: 200, opacity: 0 }, {
      y: 0,
      opacity: 1,
      duration: 1.2,
      ease: "power4.inOut",
      stagger: 0.1,
      delay: 0.2
    });
  }, [isVisible]);

  useEffect(() => {
    const moveImage = (e) => {
      if (imageContainerRef.current && containerRef.current) {
        const containerBounds = containerRef.current.getBoundingClientRect();
        const mouseX = e.clientX - containerBounds.left;
        const mouseY = e.clientY - containerBounds.top;
        const imageWidth = 300;

        gsap.to(imageContainerRef.current, {
          duration: 0.4,
          x: mouseX - imageWidth / 2,
          y: mouseY - imageWidth / 2,
          ease: "power2.out"
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

  useEffect(() => {
    if (hoveredIndex !== null) {
      gsap.to(imageContainerRef.current, {
        scale: 1,
        opacity: 1,
        duration: 0.3,
        ease: "power2.out",
        pointerEvents: "none"
      });

      gsap.to(imageListRef.current, {
        duration: 0.4,
        y: -hoveredIndex * 300,
        ease: "power2.out"
      });
    } else {
      gsap.to(imageContainerRef.current, {
        opacity: 0,
        duration: 0.3,
        ease: "power2.out"
      });
    }
  }, [hoveredIndex]);

  const categoryist = ["Web design", "Graphic design", "Branding","Autre projet"];

  const filteredProjects = selectedCategory
    ? projectList.filter((project) =>
        project.categorie.some(
          (cat) => cat.toLowerCase() === selectedCategory.toLowerCase()
        )
      )
    : projectList;

  return (
    <div className={`h-screen overflow- gap-12 flex flex-col justify-center items-center relative px-12`}>
          {/* <div className="w-full flex gap-4">
  {categoryist.map((item, index) => (
    <button
      key={index}
      onClick={() =>
        setSelectedCategory(item === selectedCategory ? null : item)
      }
      className={`w-fit rounded-sm uppercase cursor-pointer   font-supply text-xs p-2 transition-all
        ${selectedCategory === item ? "bg-[#2D2D2D] text-[#F9F9F9] hover:bg-[#414141]" : item === "Autre projet" ? "bg-[#d8d8d8] hover:bg-[#c0c0c0] text-[#2d2d2dbb] " : " border-2 b-[#d8d8d8] text-[#2d2d2d]"}
      `}
    >
      {item}
    </button>
  ))}
      </div> */}

      <div ref={containerRef} className={`bg-amber w-full`}>
        <div
          ref={imageContainerRef}
          className={`absolute h-[300px] z-20 overflow-hidden pointer-events-none`}
          style={{ top: 100, left: 0, opacity: 0, transform: "scale(0.8)" }}
        >
          <div className={`overflow-hidden`} ref={imageListRef}>
            {filteredProjects.map((item, index) => (
              <div key={index}>
                <img
                  className={`h-[300px] relative z-20`}
                  src={item.thumbnail}
                  alt=""
                />
              </div>
            ))}
          </div>
        </div>

        <div ref={animationContainerRef} className={`w-full`}>
          {filteredProjects.map((item, index) => (
            <Link
              key={index}
              className={`w-full overflow-hidden relative z-10`}
              to={`/projets/${item.id}`}
              onMouseEnter={() => setHoveredIndex(index)}
              onMouseLeave={() => setHoveredIndex(null)}
            >
              <div
                onClick={() => {
                  setbgColor(item.textColor);
                  settextColor(item.backgroundColor);
                }}
                className={`overflow-hidden`}
              >
                <div
                  ref={(el) => (strokeRef.current[index] = el)}
                  className={`h-[1.5px] ${isVisible ? 'translate-none' : '-translate-x-[100vw] '} w-full bg-black`}
                ></div>
                <div className={`transition-all flex flex-col sm:flex-row sm:items-center flex-wrap w-full hover:bg-black/[10%] hover:text-black/80 uppercase pt-3 pb-18 bord-t gap-4 sm:justify-between font-supply text-xs`}>
                  <div className={`overflow-hidden`}>
                    <p
                      className={`${isVisible ? 'translate-none' : 'translate-y-[20px] '} `}
                      ref={(el) => (dateRef.current[index] = el)}
                    >
                      {item.title}
                    </p>
                  </div>
                  <div className={`flex overflow-hidden flex-wrap`}>
                    <div
                      className={`${isVisible ? 'translate-none' : 'translate-y-[20px]'} flex overflow-hidden flex-wrap `}
                      ref={(el) => (skillRef.current[index] = el)}
                    >
                      <p className={`min-w-fit`}>categorie :</p>
                      <div className={`min-w-fit flex gap-3`}>
                        {item.categorie.map((cat, i) => (
                          <p key={i}>/{cat}</p>
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
    </div>
  );
};
