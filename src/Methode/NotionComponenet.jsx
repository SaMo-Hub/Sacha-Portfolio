import React from 'react'

export default function NotionComponenet({text, pourcent,index}) {
    
  return (
    <div className="bg-[#ffffff11] text-sm w-[224px] p-4  border border-[#ffffff09] rounded-xl">
            <h4>{index} - {text}</h4>
            <div className="flex items-center gap-3">
              <p>{pourcent}%</p>
              <div className="w-full h-1 bg-[#A1A1A1] rounded-full">
                <div
                    style={{width:`${pourcent}%`}}
                className={` h-1 bg-white rounded-full`} />
              </div>
            </div>
          </div>
  )
}
