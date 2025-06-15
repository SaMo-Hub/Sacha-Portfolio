import React, { useEffect, useRef, useState } from "react";
import { Navbar } from "../components/Navbar";
import { Navbar2 } from "../components/Navbar2";
import { Footer } from "../components/Footer";
import { motion } from "framer-motion";
import gsap from "gsap";
import { Link } from "react-router";
import SplitType from "split-type";
import RevealText from "../components/TextReveal";
import { Transition } from "../components/Transition";
import CV from "../assets/CV.pdf";
export const About = () => {
  const primaryColor = "#DBDDE2";
  const secondaryColor = "#4C76E3";
  const paragraphRef = useRef(null);
  const [bgColor, setbgColor] = useState(primaryColor)
  const [textColor, settextColor] = useState(secondaryColor)
  const skillList = ["photoshop", "ui design", "branding"];
  const experienceList = [
    {
      title: "unowhy",
      entreprise: "Brand/ui \n Designer",
      link: "https://www.linkedin.com/company/unowhy/posts/?feedView=all",
      date: "2024-2025",
    },
    {
      title: "Dhool Agency",
      entreprise: "Branding & Web design",
      date: "2024-2025",
    },
    {
      title: "Travelicious",
      entreprise: "Branding & UI UX design",
      date: "2024-2025",
    },
    {
      title: "Portfolio Amaël",
      entreprise: "Web Design & Web devlopement",
      date: "2024-2025",
    },
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
    const split = new SplitType(paragraphRef.current, {
      types: "lines,chars,words",
    });

    gsap.from(split.lines, {
      y: 50,
      opacity: 0,
      stagger: 0.3,
      duration: 0.6,
      ease: "power2.out",
      delay: 1,
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
      <Transition primaryColor={bgColor} secondaryColor={textColor}  />
      <RevealText delay={0.5} /> {/* Initialise les animations au mount */}
      <Navbar setbgColor={setbgColor} settextColor={settextColor} primary={"#DBDDE2"} secondary={"#4C76E3"} />
      <div className="gap-44 lg:gap-12 pt-32 flex lg:flex-row flex-col md:justify-between font-supply text-xs mx-12 lg:mx-12 h-full ">
        <div className="flex lg:sticky top-24 flex-col gap-42 justify-between h-full ">
          <div className="flex flex-col gap-8">
            <h2 className="uppercase">(à propos)</h2>
            <div>
              <div className="reveal-line md:w-[50%] lg:w-[250px] flex ">
                Je suis un designer de 20 ans passionné par le branding et le
                web design. Fort de plusieurs années d'expériences, j'ai eu
                l'opportunité de travailler sur divers projets qui m'ont permis
                de développer une expertise solide dans la création d'identités
                visuelles impactantes et de sites web intuitifs.
                <br />
                <br />
                Ma démarche est à la fois créative et stratégique, visant à
                offrir des solutions esthétiques qui répondent aux besoins
                spécifiques de chaque client. Mon objectif est de créer des
                expériences visuelles modernes et efficaces, tout en respectant
                les tendances actuelles du design.
              </div>
              <a
                href={CV}
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  backgroundColor: primaryColor,
                  color: secondaryColor,
                }}
                className="mt-4 group overflow-hidden flex flex-col items-center  text-xs w-fit uppercase  text-white rounded-sm p-2"
              >
                <div className="flex">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={2}
                    stroke="currentColor"
                    className="size-4"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M3 16.5v2.25A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75V16.5M16.5 12 12 16.5m0 0L7.5 12m4.5 4.5V3"
                    />
                  </svg>

                  <div className="ml-2 relative">
                    <p className=" reveal-line">Donwload CV</p>

                    <div className=" h-full w-full overflow-hidden">
                      <div
                        style={{ backgroundColor: secondaryColor }}
                        className="h-[1.5px] -translate-x-[110px] duration-300  transition-all  group-hover:-translate-x-[0px]  w-full"
                      ></div>
                    </div>
                  </div>
                </div>
              </a>
            </div>
          </div>
          {/* <div className="uppercase flex flex-col gap-8">
            <h2 className="">(skill)</h2>
            <div className="flex flex-col gap-">
              {skillList.map((item, index) => (
                <div className="group w-fit relative">
                  <p className="uppercase reveal-line transition-all">
                    /{item}
                  </p>
                  <div
                    style={{ backgroundColor: primaryColor }}
                    className="group-hover:w-full pointer-events-none duration-500 transition-all w-0 bottom-0 h-[2px] absolute"
                  ></div>
                </div>
              ))}
            </div>
          </div> */}
        </div>
        <div className="uppercase flex flex-col gap-8">
          <h2 className="">(expérience)</h2>
          <div>
            {experienceList.map((item, i) => (
              <div>
                <div className="flex gap-3 md:justify-between md:items-center">
                  <div className="group mb1 w-fit relative">
                    <div className=" overflow-hidden">
                      <div
                        to={item.link && item.link}
                        ref={(el) => (entrepriseRefs.current[i] = el)}
                        className={`uppercase ${
                          item.link ? "cursor-point" : "cursor-auto"
                        }  opacity-0 transition-all `}
                      >
                        [{item.entreprise}]
                      </div>
                    </div>
                    {/* {item.link && (
                      <div
                        style={{ backgroundColor: primaryColor }}
                        className=" group-hover:w-full pointer-events-none duration-500 transition-all w-0 bottom-0 h-[2px] absolute"
                      ></div>
                    )} */}
                  </div>
                  <p className="text-white/40">{item.date}</p>
                </div>
                {item.title.split("\n").map((item, j) => {
                  const refIndex = i * 10 + j;
                  return (
                    <div className="overflow-hidden ">
                      <h3
                        ref={(el) => (titleRefs.current[refIndex] = el)}
                        className="font-ztbroskon  text-5xl sm:text-6xl md:text-8xl"
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
      <Footer primaryColor={primaryColor} secondaryColors={secondaryColor} />
    </div>
  );
};
