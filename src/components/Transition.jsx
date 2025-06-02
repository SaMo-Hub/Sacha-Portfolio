import React from 'react'
import { motion } from "framer-motion";

export const Transition = () => {
  return (
    <motion.div 
        animate={{ translateY: "-100%" }}
        exit={{ translateY: "0%" }}
        transition={{ delay:1, duration: 0.8, ease: [1, 0, 0.58, 1] }}
        
    className='fixed bottom-0 left-0 w-full h-screen origin-top z-50 h-screen w-screen bg-amber-50 z-40 flex items-center justify-center'>
          {/* <motion.div
        style={{ backgroundColor: "black" }}
        animate={{ translateY: "-100%" }}
        exit={{ translateY: "0%" }}
        transition={{ duration: 0.8, ease: [1, 0, 0.58, 1] }}
        className="fixed bottom-0 left-0 w-full h-screen origin-top z-50"
      /> */}
      <div className='overflow-hidden rounded-xl'>
            <motion.div
        animate={{ translateY: "-110%" }}
        exit={{ translateY: "0%" }}
                transition={{delay:0.9, duration: 0.8, ease: [1, 0, 0.58, 1] }}

            className='bg-black flex flex-col gap-4 rounded-xl  text-white w-fit text-center px-12 py-10'>
                <div className='overflow-hidden'>
                <motion.h2
                animate={{ translateY: "-100%" }}

        exit={{ translateY: "0%" }}
        transition={{ duration: 0.6, ease:'easeInOut' }}
                className='font-supply translate-y-0 uppercase text-xs'>
                    (moricet)
                </motion.h2>
                </div>
                <div className='overflow-hidden flex flex-col items-baseline bg-re-50  h-[10vw] '>

                <motion.h1
                animate={{ translateY: "-100%" }}
        exit={{ translateY: "0%" }}
        transition={{duration: 0.6, ease:'easeInOut' }}
                className='font-ztbroskon text-[12vw]/[12vw] uppercase h-fit '>
                    Sacha
                </motion.h1>
                </div>
            </motion.div>  </div>
    </motion.div>
  )
}
