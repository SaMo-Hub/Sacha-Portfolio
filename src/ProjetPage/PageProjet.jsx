import React from "react";
import { projectList } from "../projectList";
import { useParams } from "react-router";
import { div } from "framer-motion/client";
import { motion } from "framer-motion";
import { Navbar } from "../components/Navbar";
import MatterCubes from "../components/MatterCubes";
import { Navbar2 } from "../components/Navbar2";

export const PageProjet = () => {
  const { id } = useParams(); // Récupérer l'id de l'URL
  const item = projectList.find((p) => p.id === parseInt(id));
  const list = ["ggg","fff"]
  
  return (
    <div
      className="custom-selection"
      style={{
        "--selection-bg": item.textColor,
        "--selection-text": item.backgroundColor,
      }}
    >

      <motion.div
        style={{ backgroundColor: item.textColor }}
        animate={{ translateY: "100%" }}
        exit={{ translateY: "0%" }}
        transition={{ duration: 0.8, ease: [1, 0, 0.58, 1] }}
        className="fixed top-0 left-0 w-full h-screen origin-bottom z-50"
      />
                <Navbar2 item={item}/>
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
          <p className="font-supply text-xs ">
            (1/{projectList.length})
          </p>
          <h1 className="text-[14vw] italic font-ztbroskon text-5xl">
            {item.title}
          </h1>
          <p className="font-supply text-xs ">

            (2023)</p>
        </div>
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
          <div className="md:ml-52 md:w-2/4">
            <p className="opacity- text-supply font-supply pb-4">Information</p>
            <p>{item.description}</p>
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
      </div>
                <MatterCubes/>

    </div>
  );
};
