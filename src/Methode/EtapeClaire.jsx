import React, { useState } from "react";
import NotionComponenet from "./NotionComponenet";
import  { forwardRef } from "react";

const EtapeClaire = forwardRef((props, ref) => {
    const [isHovering, setIstHovering] = useState(false)
  

  return (
    <div  ref={ref} className="bg-[#080808] relative font-urbanist font-medium overflow-hidden border-2 text-white border-[#ffffff09] rounded-xl w-[800px] ">
     <div className="absolute h-full w-full  bgr "></div>
      {/* <div className="absolute h-full w-full  bgr "></div> */}
      <div className="absolute h-full w-full  shadows "></div>
     <div className=" pt-2 ">
        <div className="flex text-sm text-[#D0D0D0] items-center w-fit  h-12">
          {/* Bouton a gauche */}
          <div className={`${isHovering ? "bg-[#0e0e0e] " : ""} ml-4 w-fit h-full   `}>
            <div className={`flex pr-9 gap-2 h-full items-center w-fit  bg-[#080808]  rounded-br-2xl`}>
              <div className="w-[10px] h-[10px] rounded-full hover:bg-orange-400 bg-orange-500 " />
              <div className="w-[10px] h-[10px] rounded-full hover:bg-yellow-400 bg-yellow-500 " />
              <div className="w-[10px] h-[10px] rounded-full hover:bg-green-400 bg-green-500 " />
            </div>
          </div>

          {/* 1er fenetre ouverte*/}
          <div
          onMouseEnter={()=> setIstHovering(true)}
          onMouseLeave={()=> setIstHovering(false)}
          className="bg-[#171717]  group hover:rounded-t-2xl h-full">
          <div className="bg-[#080808] group-hover:bg-[#0e0e0e] items-center h-full gap-12  rounded-br-xl   group-hover:rounded-t-2xl  px-5 flex ">
            <div className="flex items-center gap-2">
              <div className="w-4 h-3  bg-red-500 " />
              <p className="">Google Meet</p>
            </div>
            <div className="w-4 h-3  bg-red-500 " />
          </div>
          </div>
          {/* 2eme fenetre fermer */}

          <div className=" bg-[#171717]  group rounded-t-2xl w h-full ">
            <div className="bg-[#171717]   rounded-bl-xl   rounded-t-2xl w-fit items-center h-full gap-12  px-5 flex ">
              <div className="flex items-center gap-2">
                <div className="w-4 h-3  bg-red-500 " />
                <p className="">Notion</p>
              </div>
              <div className="w-4 h-3  bg-red-500 " />
            </div>
          </div>

          <div className="bg-[#171717]  h-full">
          <div className="bg-[#080808]  items-center h-full gap-12  rounded-bl-xl    px-5 flex ">
          </div>
          </div>

        </div>
      </div>

      <div className="overflow-hidden h-[280px]  p-12 text-[#ffffff] bg-gradient-to-b from-[#171717] to-[#0F0F0F] w-full   gap-3 ">
        <div>
          <div className="flex w-full items-baseline justify-between">
            <h2 className="w-full text-xl">02-Branding</h2>

            <div className="flex w-full  items-center gap-3">
              <p>70%</p>
              <div className="w-full h-1 bg-[#A1A1A1] rounded-full">
                <div className={`w-[70%] h-1 bg-white rounded-full`} />
              </div>
            </div>
          </div>

          <div className="mt-6 px-2 text-sm gap-3 flex flex-col">
            <div className="flex justify-between items-center">
              <div className="flex">
                <p>1- Worshop Brand Vision (1H)</p>
              </div>
              <div className="bg-[#ffffff0f] rounded-full px-3 py-1 flex items-center gap-2 ">
                <div className="w-2 h-2 bg-green-500 rounded-full" />
                <p>Terminé</p>
              </div>
            </div>

            <div className="flex justify-between items-center">
              <div className="flex">
                <p>1- Worshop Brand Vision (1H)</p>
              </div>
              <div className="bg-[#ffffff0f] rounded-full px-3 py-1 flex items-center gap-2 ">
                <div className="w-2 h-2 bg-green-500 rounded-full" />
                <p>Terminé</p>
              </div>
            </div>
          </div>
        </div>
        <div className="opacity-30 mt-6 scale-[0.85]">
          <div className="flex w-full items-baseline justify-between">
            <h2 className="w-full text-xl">02-Branding</h2>

            <div className="flex w-full  items-center gap-3">
              <p>70%</p>
              <div className="w-full h-1 bg-[#A1A1A1] rounded-full">
                <div className={`w-[70%] h-1 bg-white rounded-full`} />
              </div>
            </div>
          </div>

          <div className="mt-6 px-2 text-sm gap-3 flex flex-col">
            <div className="flex justify-between items-center">
              <div className="flex">
                <p>1- Worshop Brand Vision (1H)</p>
              </div>
              <div className="bg-[#ffffff0f] rounded-full px-3 py-1 flex items-center gap-2 ">
                <div className="w-2 h-2 bg-green-500 rounded-full" />
                <p>Terminé</p>
              </div>
            </div>

            <div className="flex justify-between items-center">
              <div className="flex">
                <p>1- Worshop Brand Vision (1H)</p>
              </div>
              <div className="bg-[#ffffff0f] rounded-full px-3 py-1 flex items-center gap-2 ">
                <div className="w-2 h-2 bg-green-500 rounded-full" />
                <p>Terminé</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
});

export default EtapeClaire;
