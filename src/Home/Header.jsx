import React, { useEffect, useRef } from "react";
import gsap from "gsap";

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
    <div className="h-screen   px-12 flex flex-col justify-end bg-[#F9F9F9]">
      <div className="relative bottom-12">
        <div className="overflow-hidden">
        <h2 ref={subtitlesRef} className="font-supply text-sm uppercase">(Sacha Moricet)</h2>
        </div>

        <div className="  flex justify-end flex-col  ">
          <h1 className="text-[17vw]/[16vw]   flex flex-col  font-ztbroskon uppercase  ">

            <span className="overflow-hidden">
            <p ref={(el) => (titleRefs.current[0] = el)} className="bg-amber500 h-[14vw] overflow-hidden">
Brand / web
            </p>
            </span>
            <span className="overflow-hidden">
              <p className="bg-amber-00 h-[14vw] " ref={(el) => (titleRefs.current[1] = el)}>Designer</p>
            </span>
          </h1>
        </div>
      </div>
    </div>
  );
};
