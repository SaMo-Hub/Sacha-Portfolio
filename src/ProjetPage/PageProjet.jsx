import React, { useEffect, useRef } from "react";
import { projectList } from "../projectList";
import { useParams } from "react-router";
import { div } from "framer-motion/client";
import { motion } from "framer-motion";
import { Navbar } from "../components/Navbar";
import MatterCubes from "../components/MatterCubes";
import { Navbar2 } from "../components/Navbar2";
import gsap from "gsap";

export const PageProjet = () => {
  const { id } = useParams(); // Récupérer l'id de l'URL
  const item = projectList.find((p) => p.id === parseInt(id));
  const list = ["ggg", "fff"];
  const titleRef = useRef(null);
  const dateRef = useRef(null);
  const projetNumberRef = useRef(null);
  useEffect(() => {
    if (titleRef.current && dateRef.current) {
      gsap.fromTo(
        titleRef.current,
        { y: 1000, opacity: 0 },
        { y: 0, opacity: 1, duration: 1.3, ease: "power4.out", stagger: 0 }
      );
      gsap.fromTo(
        [projetNumberRef.current, dateRef.current],
        { y: 1000, opacity: 0 },
        { y: 0, opacity: 1, duration: 1.3, ease: "power4.out", stagger: 0.4 }
      );
    }
  }, [item]);

  return (
    <div
      className="custom-selection"
      style={{
        "--selection-bg": item.textColor,
        "--selection-text": item.backgroundColor,
      }}
    >
        <motion.div
      
              initial={{
          clipPath: "inset(0% 0% 0% 0%)", // plein écran visible
        }}
        animate={{
          clipPath: "inset(100% 0% 0% 0%)", // cache par le haut
        }}
        exit={{
          clipPath: "inset(0% 0% 0% 0%)", // réapparaît quand on quitte
        }}
              transition={{  duration: 1.25, ease: [0.9, 0, 0.1, 1] }}
              className=" fixed top-0 left-0 w-screen h-screen origin-[top] text-white items-center flex flex-col justify-center bg-blue-500 pointer-events-none z-40"
            >
               <div className='overflow-hidden '>
                            <motion.h2
                            animate={{ translateY: "-100%" }}
                  initial={{translateY: "0%"}}
                    exit={{ translateY: "0%" }}
                    transition={{delay:0.5, duration: 0.6, ease:'easeInOut' }}
                            className='font-supply translate-y-0 uppercase text-xs'>
                                (moricet)
                            </motion.h2>
                            </div>
                            <div className='overflow-hidden flex flex-col items-baseline  h-[10vw] '>
            
                            <motion.h1
                                              initial={{translateY: "0%"}}

                            animate={{ translateY: "-100%" }}
                    exit={{ translateY: "0%" }}
                    transition={{delay:0.7 ,duration: 0.6, ease:'easeInOut' }}
                            className='font-ztbroskon text-[12vw]/[12vw] uppercase h-fit '>
                                Sacha
                            </motion.h1>
                            </div>
            </motion.div>
      {/* <motion.div
        style={{ backgroundColor: "black" }}
        animate={{ translateY: "-100%" }}
        exit={{ translateY: "0%" }}
        transition={{ duration: 0.8, ease: [1, 0, 0.58, 1] }}
        className="fixed bottom-0 left-0 w-full h-screen origin-top z-50"
      /> */}
      <Navbar2 item={item} />
      <div
        style={{ backgroundColor: item.backgroundColor, color: item.textColor }}
        className=""
      >
        <div
          style={{
            backgroundColor: item.backgroundColor,
            color: item.textColor,
          }}
          className="h-screen px-12  w-full flex justify-between items-center"
        >
          <div className="overflow-hidden">
            <p ref={projetNumberRef} className="font-supply text-xs ">
              (1/{projectList.length})
            </p>
          </div>
          <div className="bg-amber-0 flex items-center   wf overflow-hidden">
            <h1 ref={titleRef} className="text-[14vw]/[15vw]   font-ztbroskon ">
              {item.title}
            </h1>
          </div>
          <div className="overflow-hidden">
            <p ref={dateRef} className="font-supply text-xs ">
              (2023)
            </p>
          </div>
        </div>

<div className="grid grid-cols-12 grid-rows-1 gap-0 relative mx-12">
  {/* Partie sticky avec top défini */}
  <div className="sticky top-24 col-start-1 col-end-5 row-start-1 row-end-2 text-xs font-supply self-start">
    <div>
      <div className="uppercase flex flex-col gap-5">
        <p>(role)</p>
        <div className="flex flex-col gap-">
          {item.categorie.map((cat, index) => (
            <p key={index}>/{cat}</p>
          ))}
        </div>
      </div>
      <p className="mt-12">{item.description}</p>
    </div>
    <div className="bg-black mt-2 text-xs w-fit uppercase text-white rounded-sm p-2">
      site live
    </div>
  </div>

  {/* Partie scrollable à côté */}
  <div className="col-start-6 col-end-13 row-start-1 row-end-2">
    <div className="flex flex-col gap-4">
      {item.listImage.slice(1).map((image, imgIndex) => (
        <div key={imgIndex}>
          {image.grid && (
            <div className={`${image.gridName} grid gap-4`}>
              {image.grid.map((gridImg, index) => (
                <img key={`grid-${imgIndex}-${index}`} src={gridImg} alt="" />
              ))}
            </div>
          )}

          {image.img && (
            <img
              key={`img-${imgIndex}`}
              className="w-full"
              src={image.img}
              alt={`Illustration ${imgIndex + 1}`}
            />
          )}
        </div>
      ))}
    </div>
  </div>
</div>

        {/* <div>
        <div         style={{ backgroundColor: item.textColor, color: item.backgroundColor }}
 className="flex-col px-12 md:flex-row  p-24 gap-8 flex">
          <div
            style={{
              borderColor: `${item.textColor}50`, // 80 en hex = 50% d'opacité
            }}
            className="hover:border-[#ffffff2a] transition-all w-fit hover:bg-white/10 flex h-fit items-center rounded-sm  py-1.5 p-2 border"
          >
            <p className="font-supply text-supply w-fit ">{item.categorie}</p>
          </div>
          <div className="flex justify-end w-full">
  <div className="w-2/3">
    <p className="text-supply font-supply pb-4">Information</p>
    <p className="font-ztbroskon text-5xl">{item.description}</p>
  </div>
</div>
        </div>
        <div className="flex flex-col gap-4">
          {item.listImage.slice(1).map((image, imgIndex) => (
            <div key={imgIndex}>
              {image.grid && (
                <div className={`${image.gridName} grid gap-4`}>
                  {image.grid.map((item, index) => (
                    <img key={`grid-${imgIndex}-${index}`} src={item} alt="" />
                  ))}
                </div>
              )}

              {image.img && (
                <img
                  key={`img-${imgIndex}`}
                  className="w-full"
                  src={image.img}
                  alt={`Illustration ${imgIndex + 1}`}
                />
              )}
            </div>
          ))}
        </div>
      </div> */}
      </div>
    </div>
  );
};
