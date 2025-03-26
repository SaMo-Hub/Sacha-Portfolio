import React from 'react'
import lavendercake from "../public/images/lavender.png"
import TitreH2 from './titreH2'

export default function VisionDevienLegende() {
  return (
    <div className='ml-20 mt-80 font-urbanist'>
        <TitreH2 text1={"Quand la vision devient"} text2={"une légende"} />
        <div className='mt-20 gap-20 grid-cols-2 grid'>
            <div className=' w-[420px] '>
                <img src={lavendercake} alt="" />
                <div className='flex flex-col gap-2 '>
                    <h4 className='font-semibold  text-[#7d7d7d] mt-5'>
                    The most flowys cake.
                    </h4>
                    <p>Le premium méritait d'être accessible à tous. Nous avons créé un univers visuel où l'élégance rencontre l'authenticité, sublimant leur vision pour une cosmétique sans compromis.</p>
                    <div className='flex gap-4'>
                        <div className='text-[#5D5D5D] w-fit rounded-full bg-[#ffffff22] border-2 border-[#ffffff1f] py-1 px-4'>
                            Branding
                        </div>
                        <div className='text-[#5D5D5D] w-fit rounded-full bg-[#ffffff22] border-2 border-[#ffffff1f] py-1 px-4'>
                            Branding
                        </div>
                    </div>
                </div>
            </div>
           
        </div>
    </div>
  )
}
