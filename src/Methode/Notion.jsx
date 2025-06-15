import React, { useState, forwardRef } from "react";
import NotionComponenet from "./NotionComponenet";

const Notion = forwardRef((props, ref) => {
  const [isHovering, setIsHovering] = useState(false);

  const listAvancement = [
    { text: "Onboarding", pourcent: 100 },
    { text: "Onboarding", pourcent: 100 },
    { text: "Onboarding", pourcent: 80 },
    { text: "Onboarding", pourcent: 20 },
    { text: "Onboarding", pourcent: 100 },
    { text: "Onboarding", pourcent: 80 },
    { text: "Onboarding", pourcent: 60 },
    { text: "Onboarding", pourcent: 100 },
    { text: "Onboarding", pourcent: 90 },
    { text: "Onboarding", pourcent: 20 },
  ];

  return (
    <div
      ref={ref}
      className="bg-[#080808] relative overflow-hidden font-urbanist font-medium border-2 text-white border-[#ffffff09] rounded-xl w-[2000px]"
    >
      <div className="absolute h-full w-full bgr"></div>
      <div className="absolute h-full w-full shadows"></div>

      {/* Barre supérieure */}
      <div className="pt-2">
        <div className="flex text-[#D0D0D0] text-sm items-center w-fit h-12">
          {/* Boutons à gauche */}
          <div className={`ml-4 w-fit h-full ${isHovering ? "bg-[#0e0e0e]" : ""}`}>
            <div className="flex pr-9 gap-2 h-full items-center w-fit bg-[#080808] rounded-br-2xl">
              <div className="w-[10px] h-[10px] rounded-full hover:bg-orange-400 bg-orange-500"></div>
              <div className="w-[10px] h-[10px] rounded-full hover:bg-yellow-400 bg-yellow-500"></div>
              <div className="w-[10px] h-[10px] rounded-full hover:bg-green-400 bg-green-500"></div>
            </div>
          </div>

          {/* Fenêtre Google Meet */}
          <div
            onMouseEnter={() => setIsHovering(true)}
            onMouseLeave={() => setIsHovering(false)}
            className="bg-[#171717] group hover:rounded-t-2xl h-full"
          >
            <div className="bg-[#080808] group-hover:bg-[#0e0e0e] items-center h-full gap-12 rounded-br-xl group-hover:rounded-t-2xl px-5 flex">
              <div className="flex items-center gap-2">
                <div className="w-4 h-3 bg-red-500"></div>
                <p>Google Meet</p>
              </div>
              <div className="w-4 h-3 bg-red-500"></div>
            </div>
          </div>

          {/* Fenêtre Notion */}
          <div className="bg-[#171717] group rounded-t-2xl h-full">
            <div className="bg-[#171717] rounded-bl-xl rounded-t-2xl w-fit items-center h-full gap-12 px-5 flex">
              <div className="flex items-center gap-2">
                <div className="w-4 h-3 bg-red-500"></div>
                <p>Notion</p>
              </div>
              <div className="w-4 h-3 bg-red-500"></div>
            </div>
          </div>
        </div>
      </div>

      {/* Contenu principal */}
      <div className="bg-[#0e0e0e] overflow-hidden p-12 text-[#ffffff] bg-gradient-to-b from-[#171717] to-[#0F0F0F] w-fit gap-3">
        <div className="h-20 w-20 rounded-xl flex items-center justify-center bg-violet-500">
          Logo
        </div>
        <h2 className="mt-3 font-semibold text-2xl">Lavender Cake - Formule Take Off</h2>

        {/* Avancement du projet */}
        <div className="flex mt-8 gap-3">
          <div className="w-5 h-5 bg-white"></div>
          <p>Avancement du projet</p>
        </div>

        <div className="grid gap-3 h-40 mt-4 grid-cols-4 w-full">
          {listAvancement.map((item, index) => (
            <NotionComponenet key={index} index={index + 1} text={item.text} pourcent={item.pourcent} />
          ))}
        </div>
      </div>
    </div>
  );
});

export default Notion;
