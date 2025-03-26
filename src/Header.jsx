import React from 'react'
import danteh from "../public/images/Miniature/danteh.png"
import Button from './components/Button'

function Header() {
  return (
    <div className='pt-44  font-urbanist'>
        <div>
            <div className='flex gap-10 flex-col justify-center items-center'>
                <h1 className='text-center lg:w-[40%] mx-20 text-5xl font-urbanist'>
                    Devenez irrésistible sur votre marché et signez vos <span className='bg-gradient-to-b from-[#777777] swap to-[#414141] bg-clip-text text-transparent font-instrument italic text-6xl'> clients de rêves</span>
                </h1>
                <p className=' w-[40%] text-center'>
                Branding, landing pages et sites marketing sur-mesure dans des offres packagées, démarrez en moins de 5 minutes.
                </p>
                <Button text={"Découvrir nos offres"}/>
            </div>
            <div className='h-[450px] masked-text masked-leftright mt-40 overflow-x-hidden  gap-5 flex '>
                <img className='h-full min-w-max' src={danteh} alt="" />
                <img className='h-full min-w-max' src={danteh} alt="" />
                <img className='h-full min-w-max' src={danteh} alt="" />
            </div>
        </div>
        <div className='grid md:grid-cols-3 grid-cols-2 gap-y-10 font-medium  gap-x-5 mx-20 mt-20 justify-center items-center'>
            <div>
                <div className='flex gap-3'>
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
                        <path d="M2 12C2 12 5 5 12 5C19 5 22 12 22 12C22 12 19 19 12 19C5 19 2 12 2 12Z" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                        <path d="M12 15C13.6569 15 15 13.6569 15 12C15 10.3431 13.6569 9 12 9C10.3431 9 9 10.3431 9 12C9 13.6569 10.3431 15 12 15Z" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                    <h3 className='text-xl '>Des designs fait pour convertir votre traffic</h3>
                </div>
                <p className='text-[#626262] '>
                Nous maximisons votre potentiel digital avec des designs qui ne font pas que séduire. Ils convertissent.
                </p>
            </div>
            
            <div>
                <div className='flex gap-3'>
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
                        <path d="M2 12C2 12 5 5 12 5C19 5 22 12 22 12C22 12 19 19 12 19C5 19 2 12 2 12Z" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                        <path d="M12 15C13.6569 15 15 13.6569 15 12C15 10.3431 13.6569 9 12 9C10.3431 9 9 10.3431 9 12C9 13.6569 10.3431 15 12 15Z" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                    <h3 className='text-xl font-'>Des designs fait pour convertir votre traffic</h3>
                </div>
                <p className='text-[#626262] '>
                Nous maximisons votre potentiel digital avec des designs qui ne font pas que séduire. Ils convertissent.
                </p>
            </div>
            
            <div>
                <div className='flex gap-3'>
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
                        <path d="M2 12C2 12 5 5 12 5C19 5 22 12 22 12C22 12 19 19 12 19C5 19 2 12 2 12Z" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                        <path d="M12 15C13.6569 15 15 13.6569 15 12C15 10.3431 13.6569 9 12 9C10.3431 9 9 10.3431 9 12C9 13.6569 10.3431 15 12 15Z" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                    <h3 className='text-xl font-'>Des designs fait pour convertir votre traffic</h3>
                </div>
                <p className='text-[#626262] '>
                Nous maximisons votre potentiel digital avec des designs qui ne font pas que séduire. Ils convertissent.
                </p>
            </div>
            
        </div>
    </div>
  )
}

export default Header