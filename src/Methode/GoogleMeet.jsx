import React, { forwardRef } from "react";

const GoogleMeet = forwardRef((props, ref) => {
  return (
    <div ref={ref} className="bg-[#080808] overflow-hidden relative font-urbanist font-medium border-2 text-white border-[#ffffff09] rounded-xl w-fit">
      <div className="absolute h-full w-full bgr"></div>
      <div className="absolute h-full w-full shadows"></div>
      <div className="pt-2">
        <div className="flex text-[#D0D0D0] text-sm items-center w-fit h-12">
          {/* Bouton à gauche */}
          <div className="ml-4 w-fit h-full bg-[#141414]">
            <div className="flex pr-9 gap-2 h-full items-center w-fit bg-[#080808] rounded-br-2xl">
              <div className="w-[10px] h-[10px] rounded-full hover:bg-orange-400 bg-orange-500"></div>
              <div className="w-[10px] h-[10px] rounded-full hover:bg-yellow-400 bg-yellow-500"></div>
              <div className="w-[10px] h-[10px] rounded-full hover:bg-green-400 bg-green-500"></div>
            </div>
          </div>

          {/* 1ère fenêtre ouverte */}
          <div className="bg-[#171717] items-center h-full gap-12 rounded-t-2xl px-5 flex">
            <div className="flex items-center gap-2">
              <div className="w-4 h-3 bg-red-500"></div>
              <p className="text">Google Meet</p>
            </div>
            <div className="w-4 h-3 bg-red-500"></div>
          </div>

          {/* 2ème fenêtre fermée */}
          <div className="bg-[#171717] group hover:rounded-t-2xl h-full">
            <div className="bg-[#080808] group-hover:bg-[#0e0e0e] rounded-bl-xl group-hover:rounded-t-2xl w-fit items-center h-full gap-12 px-5 flex">
              <div className="flex items-center gap-2">
                <div className="w-4 h-3 bg-red-500"></div>
                <p className="text">Notion</p>
              </div>
              <div className="w-4 h-3 bg-red-500"></div>
            </div>
          </div>
        </div>
      </div>

      {/* Contenu des écrans */}
      <div className="bg-[#0e0e0e] text-[#9F9F9F] bg-gradient-to-b from-[#171717] to-[#0F0F0F] w-fit flex gap-3 p-3">
        <div>
          <div className="w-[450px] rounded-lg flex items-center justify-center h-[460px] bg-[#ffffff09]">
            <div className="w-[78px] text-4xl flex items-center justify-center h-[78px] rounded-full bg-[#ffffff09]">
              S
            </div>
          </div>
          <p className="mt-3 pl-2">Sacha Moricet | Dhool Agency</p>
        </div>
        <div>
          <div className="w-[450px] rounded-lg flex items-center justify-center h-[460px] bg-[#ffffff09]">
            <div className="w-[78px] text-4xl flex items-center justify-center h-[78px] rounded-full bg-[#ffffff09]">
              C
            </div>
          </div>
          <p className="mt-3 mb-6">Client | Ecole</p>
        </div>
      </div>

      {/* Footer */}
      <div className="flex items-center gap-[200px] p-4 pl-5">
        <p className="font-semibold text-[#CECECE]">9:10 | On-Boarding</p>
        <div className="flex gap-2">
          <div className="rounded-full w-8 h-8 bg-white"></div>
          <div className="rounded-full flex w-fit h-8 bg-[#ffffff33]">
            <div className="w-8 rounded-full flex items-center justify-center">^</div>
            <div className="w-8 h-8 rounded-full bg-[#ffffff33]"></div>
          </div>
          <div className="rounded-full flex w-fit h-8 bg-[#ffffff33]">
            <div className="w-8 rounded-full flex items-center justify-center">^</div>
            <div className="w-8 h-8 rounded-full bg-[#ffffff33]"></div>
          </div>
          <div className="w-12 h-8 rounded-full bg-[#e60101]"></div>
        </div>
      </div>
    </div>
  );
});

export default GoogleMeet;
