import React, { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import TitreH2 from "./titreH2";
import Button from "./components/Button";
import GoogleMeet from "./Methode/GoogleMeet";
import EtapeClaire from "./Methode/EtapeClaire";
import Notion from "./Methode/Notion";

gsap.registerPlugin(ScrollTrigger);

export default function Test() {
  const etapeRef = useRef(null);
  const imagesRef = useRef([]);
  const textContainerRef = useRef();
  const [activeStep, setActiveStep] = useState(0);
  console.log(imagesRef);
  const composants = [Notion, GoogleMeet, EtapeClaire];

  const steps = [
    {
      number: "1",
      title: "Démarrage en quelques clics",
      description:
        "Démarrez rapidement et à distance, sans devis ni cahier des charges.",
    },
    {
      number: "2",
      title: "Configuration Personnalisée",
      description:
        "Nous adaptons les paramètres selon vos besoins spécifiques.",
    },
    {
      number: "3",
      title: "Mise en Production",
      description:
        "Votre projet est lancé et optimisé pour de meilleures performances.",
    },
    {
      number: "4",
      title: "Suivi & Assistance",
      description:
        "Nous assurons un suivi continu pour garantir votre satisfaction.",
    },
  ];
  useEffect(() => {
    if (!etapeRef.current || imagesRef.current.length === 0) return;

    // Sélectionne les étapes à l'intérieur
    const etapes = etapeRef.current.children;

    imagesRef.current.forEach((image, index) => {
      ScrollTrigger.create({
        trigger: image,
        start: "top center",
        end: "bottom center",
        onEnter: () => {
          gsap.to(etapeRef.current, {
            y: -index * 60,
            duration: 1,
            ease: "power3.inOut",
          }),
            switchStep(index);
        },
        onEnterBack: () => {
          gsap.to(etapeRef.current, {
            y: -index * 60,
            duration: 1,
            ease: "power3.inOut",
          }),
            switchStep(index);
        },
      });
    });
  }, []);
  const switchStep = (index) => {
    if (index !== activeStep) {
      const tl = gsap.timeline();

      // Animation sortie de l'ancien texte
      tl.to(textContainerRef.current, {
        opacity: 0,
        filter: "blur(10px)",
        duration: 0.8,
        ease: "power2.out",
      })
        .add(() => setActiveStep(index)) // Changer le texte une fois que l'opacité est 0
        .to(textContainerRef.current, {
          opacity: 1,
          filter: "blur(0px)",
          duration: 0.8,
          ease: "power2.out",
        });
    }
  };
  return (
    <div className="ml-20 mt-80 h-full font-urbanist text-white">
      <TitreH2 text1={"Grâce à une méthode"} text2={"en 4 étapes"} />

      {/* Conteneur */}
      <div className="flex gap-52">
        {/* Section Texte (sticky) */}
        <div className="sticky h-[75vh] top-20 py-[10em] flex flex-col gap-10">
          <div className="w-fit font-semibold px-8 py-5 rounded-lg bg-[#ffffff2a] flex flex-col justify-center items-center">
            <p className="text-[#8B8B8B]">Étape</p>
            <div className="text-[40px] masked-text overflow-hidden h-[60px]">
              <p ref={etapeRef} className="flex  items-center flex-col">
                <span>1</span>
                {/* <span>1.5</span> */}
                <span>2</span>
                {/* <span>2.5</span> */}
                <span>3</span>
                {/* <span>3.5</span> */}
                <span>4</span>
              </p>
            </div>
          </div>

          <div className="w-[320px]   flex flex-col gap-5 opacity-100 ">
            <div ref={textContainerRef}>
              <div className="flex items-center">
                <div className="h-3 w-3 absolute -left-7 rounded-full bg-white" />
                <h3 className="text-2xl font-medium">
                  {steps[activeStep].title}
                </h3>
              </div>
              <p className="font-semibold text-[#7B7B7B]">
                {steps[activeStep].description}
              </p>
            </div>
            <Button text={"Prendre rendez-vous"} />
          </div>
        </div>

        {/* Section Images avec défilement */}
        <div className="relative  overflow-hidden flex mt-32 flex-col gap-10 ml-[0px]">
          
          {composants.map((Component, index) => (
  <Component  ref={el => imagesRef.current[index] = el} />

          ))}
          {/* {[ "white", "white", "white", "white" ].map((color, index) => (
            <div
              key={index}
              ref={el => imagesRef.current[index] = el}
              className={`w-[1423px] bg-${color} h-[800px]`}
            />
          ))} */}
        </div>
      </div>
    </div>
  );
}
