import React, { useEffect, useRef } from 'react'
import TitreH2 from './titreH2'
import FaqComponent from './FaqComponent'
import gsap from 'gsap';

export default function FAQ() {
  const textRef = useRef(null);
  useEffect(() => {
    if (!textRef.current) return;

    const words = textRef.current.querySelectorAll("span"); // Sélectionne chaque mot

    gsap.fromTo(
      words,
      { opacity: 0, y: 50, filter: "blur(10px)" }, // Départ en bas et flou
      {
        opacity: 1,
        y: 0,
        filter: "blur(0px)",
        duration: 1,
        ease: "power3.out",
        stagger: 0.08, // Décalage de 0.15s entre chaque mot
        
      }
    );
  }, []);
  return (
    <div className='mx-20 gap-24 lg:flex-row flex-col flex mt-80 '>
      <TitreH2 textRefs={textRef} text1={"Vous avez"} text2={"une question ?"}/>
      
        <div className='w-full'>
            <div className='flex font-urbanist mb-6 text-xl font-medium'>
                <h3>
                    Oui,mais...
                </h3>
            </div>
            <div className='flex flex-col gap-2'>
              <FaqComponent/>
              <FaqComponent/>
              <FaqComponent/>
            </div>
        </div>
    </div>
  )
}
