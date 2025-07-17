// import { Navbar } from "../components/Navbar";
// import { Navbar2 } from "../components/Navbar2";
import { Footer } from "../components/Footer";
import { Navbar } from "../components/Navbar";
import { Navbar2 } from "../components/Navbar2";
import { Transition } from "../components/Transition";
import { useRevealer } from "../components/useRevealer";
import { GridProjet } from "./gridProjet";
import { Header } from "./Header";
import { Rolodex } from "./Rolodex";
import { motion } from "framer-motion";
import gsap from "gsap";
import CustomEase from "gsap/CustomEase";
import React, { useEffect, useState } from "react";

function Home() {
  const [bgColor, setbgColor] = useState("#2D2D2D")
    const [textColor, settextColor] = useState("#F9F9F9")
  gsap.registerPlugin(CustomEase);
  CustomEase.create("hop", "0.9, 0, 0.1, 1");

  useEffect(() => {
    gsap.to(".revealer", {
      scaleY: 0,
      duration: 1.25,

      ease: "hop",
    });
  });

  return (
    <div 
     className="bg-[#F9F9F9] custom-selection"
      style={{
        color:"#2D2D2D",
        "--selection-bg": "#2D2D2D",
        "--selection-text": "#F9F9F9",
      }}
    >
      {/* <div className="revealer fixed top-0 left-0 w-screen h-[100svh] origin-[top] bg-black pointer-events-none z-40 "></div> */}
      <Transition primaryColor={bgColor} secondaryColor={textColor}/>
    

      <Navbar setbgColor={setbgColor} settextColor={settextColor}  primary={'#2D2D2D'} secondary={"#F9F9F9"} />
      <Header />
      <Rolodex  setbgColor={setbgColor} settextColor={settextColor}/> 
      {/* <GridProjet /> */}
      <Footer primaryColor={"#2D2D2D"} secondaryColors={"#F9F9F9"}/>
    </div>
  );
}

export default Home;