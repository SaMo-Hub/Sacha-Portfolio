import React, { useEffect, useRef } from "react";
import { Navbar } from "../components/Navbar";
import { Navbar2 } from "../components/Navbar2";
import { Footer } from "../components/Footer";
import { motion } from "framer-motion";
import gsap from "gsap";
import { Link } from "react-router";
import SplitType from "split-type";

export const About = () => {
  const primaryColor = "#DBDDE2";
  const secondaryColor = "#4C76E3";
const paragraphRef = useRef(null);
     const split = new SplitType(paragraphRef.current, { types: "lines" });

  const skillList = ["photoshop", "ui design", "branding"];
  const experienceList = [
    {
      title: "Brand/ui \n Designer",
      entreprise: "unowhy",
      link: "https://www.linkedin.com/company/unowhy/posts/?feedView=all",
      date: "2024-2025",
    },
    { title: "freelance", entreprise: "freelance", date: "2024-2025" },
    { title: "freelance", entreprise: "freelance", date: "2024-2025" },
    { title: "freelance", entreprise: "freelance", date: "2024-2025" },
  ];
  const titleRefs = useRef([]);
  const entrepriseRefs = useRef([]);
  titleRefs.current = [];

  useEffect(() => {
    gsap.fromTo(
      [titleRefs.current],
      { y: 1000, opacity: 0 },
      { y: 0, opacity: 1, duration: 1.2, ease: "power4.out", stagger: 0.2 }
    );
    gsap.fromTo(
      [entrepriseRefs.current],
      { y: 0, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 0.2,
        ease: "power4.inOut",
        stagger: 0.2,
        delay: 0.9,
      }
    );
    const split = new SplitType(paragraphRef.current, { types: "lines" });
console.log(split);

  gsap.from(split.lines, {
    y: 50,
    opacity: 0,
    stagger: 0.3,
    duration: 0.6,
    ease: "power2.out",
  });
  }, []);

  return (
    <div
      style={{
        "--selection-bg": primaryColor,
        "--selection-text": secondaryColor,
        background: secondaryColor,
        color: primaryColor,
      }}
      className=" custom-selection h-full flex flex-col justify-between 
       "
    >
      {/* <motion.div
        style={{ backgroundColor: "black" }}
        animate={{ translateY: "-100%" }}
        exit={{ translateY: "0%" }}
        transition={{ duration: 0.8, ease: [1, 0, 0.58, 1] }}
        className="fixed bottom-0 left-0 w-full h-screen origin-top z-50"
      /> */}
      <Navbar primary={"#DBDDE2"} secondary={"#4C76E3"} />
      <div className="py-32 flex md:flex-row flex-col md:justify-between font-supply text-xs mx-8 md:mx-[175px] h-full ">
        <div className="flex sticky top-24 flex-col gap-42 justify-between h-full ">
          <div className="flex flex-col gap-8">
            <h2 className="uppercase">(à propos)</h2>
           
            <div ref={paragraphRef} className="w-[250px] flex ">
              We invest almost exclusively in the United States and Canada,
              though we make exceptions for certain natively global industries.
            </div>
            
          </div>
          <div className="uppercase flex flex-col gap-8">
            <h2 className="">(skill)</h2>
            <div>
              {skillList.map((item, index) => (
                <div className="group w-fit relative">
                  <p className="uppercase transition-all">/{item}</p>
                  <div
                    style={{ backgroundColor: primaryColor }}
                    className="group-hover:w-full pointer-events-none duration-500 transition-all w-0 bottom-0 h-[2px] absolute"
                  ></div>
                </div>
              ))}
            </div>
          </div>
        </div>
        <div className="uppercase flex flex-col gap-8">
          <h2 className="">(experence)</h2>
          <div>
            {experienceList.map((item, i) => (
              <div>
                <div className="flex justify-between items-center">
                  <div className="group mb1 w-fit relative">
                    <div className=" overflow-hidden">
                      <Link
                        to={item.link && item.link}
                        ref={(el) => (entrepriseRefs.current[i] = el)}
                        className={`uppercase ${
                          item.link ? "cursor-pointer" : "cursor-auto"
                        }  opacity-0 transition-all `}
                      >
                        [{item.entreprise}]
                      </Link>
                    </div>
                    {item.link && (
                      <div
                        style={{ backgroundColor: primaryColor }}
                        className=" group-hover:w-full pointer-events-none duration-500 transition-all w-0 bottom-0 h-[2px] absolute"
                      ></div>
                    )}
                  </div>
                  <p className="text-black/40">{item.date}</p>
                </div>
                {item.title.split("\n").map((item, j) => {
                  const refIndex = i * 10 + j;
                  return (
                    <div className="overflow-hidden ">
                      <h3
                        ref={(el) => (titleRefs.current[refIndex] = el)}
                        className="font-ztbroskon w-[40vw] text-6xl md:text-8xl"
                      >
                        {item}
         
                      </h3>
                    </div>
                  );
                })}
                <hr className="my-6 border" />
              </div>
            ))}
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};
