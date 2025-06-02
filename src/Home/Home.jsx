
import { Navbar } from "../components/Navbar"
import { Navbar2 } from "../components/Navbar2"
import { Transition } from "../components/Transition"
import { useRevealer } from "../components/useRevealer"
import { GridProjet } from "./gridProjet"
import { Header } from "./Header"
import { Rolodex } from "./Rolodex"
import { motion } from "framer-motion";
import gsap from 'gsap'
import CustomEase from 'gsap/CustomEase'
import React, { useEffect } from 'react'

function Home() {
 gsap.registerPlugin(CustomEase)
    CustomEase.create("hop", "0.9, 0, 0.1, 1")

  useEffect(()=>{

    gsap.to(".revealer", {
      scaleY:0,
      duration : 1.25,
      
      ease: "hop"
    })
  })

  return (
    <div>
      {/* <div className="revealer fixed top-0 left-0 w-screen h-[100svh] origin-[top] bg-black pointer-events-none z-40 "></div> */}
      {/* <Transition/> */}
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
      
              exit={{ translateY: "0%" }}
              transition={{delay:0.5, duration: 0.6, ease:'easeInOut' }}
                      className='font-supply translate-y-0 uppercase text-xs'>
                          (moricet)
                      </motion.h2>
                      </div>
                      <div className='overflow-hidden flex flex-col items-baseline  h-[10vw] '>
      
                      <motion.h1
                      animate={{ translateY: "-100%" }}
              exit={{ translateY: "0%" }}
              transition={{delay:0.7 ,duration: 0.6, ease:'easeInOut' }}
                      className='font-ztbroskon text-[12vw]/[12vw] uppercase h-fit '>
                          Sacha
                      </motion.h1>
                      </div>
      </motion.div>
     
      <Navbar/>
      <Header/>
      <Rolodex/>
    </div>
  )
}

export default Home
