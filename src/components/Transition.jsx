import React from 'react'
import { motion } from "framer-motion";

export const Transition = ({primaryColor, secondaryColor}) => {
  
  // console.log(primaryColor);
  
  return (
    <div>


    <motion.div
            initial={{
              clipPath: "inset(0% 0% 0% 0%)", // plein écran visible
            }}
            animate={{
              clipPath: "inset(100% 0% 0% 0%)", // cache par le haut
            }}
          style={{backgroundColor: primaryColor,color:secondaryColor}}
            transition={{ duration: 1.35, delay:0, ease: [0.9, 0, 0.1, 1] }}
            className=" fixed z-50 top-0 left-0 w-screen h-screen origin-[top] text-white items-center flex flex-col justify-center bg-blue-500 pointer-events-none"
          >
            <div className="overflow-hidden ">
              <motion.h2
                animate={{ translateY: "100%" }}
                transition={{delay:0.35,duration: 0.4, ease: "easeInOut" }}
                className="font-supply translate-y-0 uppercase text-xs"
              >
                (moricet)
              </motion.h2>
            </div>
            <div className="overflow-hidden flex flex-col items-baseline  h-[10vw] ">
              <motion.h1
                animate={{ translateY: "100%" }}
                transition={{ delay:0.25,duration: 0.5, ease:[0.9, 0, 0.1, 0.7]  }}
                className="font-ztbroskon text-[12vw]/[12vw] uppercase h-fit "
              >
                Sacha
              </motion.h1>
            </div>
          </motion.div>
                  <motion.div
                          style={{backgroundColor: primaryColor,color:secondaryColor}}

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
                                      animate={{ translateY: "100%" }}
                            initial={{translateY: "0%"}}
                              exit={{ translateY: "0%" }}
                              transition={{delay:0.6, duration: 0.6,  ease:[0.9, 0, 0.1, 0.7]  }}
                                      className='font-supply translate-y-0 uppercase text-xs'>
                                          (moricet)
                                      </motion.h2>
                                      </div>
                                      <div className='overflow-hidden flex flex-col items-baseline  h-[10vw] '>
                      
                                      <motion.h1
                                                        initial={{translateY: "0%"}}
          
                                      animate={{ translateY: "100%" }}
                              exit={{ translateY: "0%" }}
                              transition={{delay:0.4 ,duration: 0.6,  ease:[0.9, 0, 0.1, 0.7]  }}
                                      className='font-ztbroskon text-[12vw]/[12vw] uppercase h-fit '>
                                          Sacha
                                      </motion.h1>
                                      </div>
                      </motion.div>
             </div>
  )
}
