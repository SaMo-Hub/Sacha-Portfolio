import React from 'react'
import Button from './components/Button'

export default function PricingComponent({stroke}) {
  return (
    <div className='bg-[#171717] relative  w-fit mt-10 font-urbanist font-medium rounded-[32px]  items-center flex px-10 py-8 flex-col gap-8'>
        <div className={`${stroke ? 'inline' : 'hidden'} border-2 border-white border-dashed masked-stroke  absolute w-full h-full top-0 rounded-[32px]`}></div>
            <div className='gap-2 flex flex-col justify-center items-center text-center'>
                <h4 className='text-[28px] '>Take-Off</h4>
                <div className='flex  text-[#FF8C00] items-center gap-2'>
                    <svg xmlns="http://www.w3.org/2000/svg" width="17" height="17" viewBox="0 0 17 17" fill="none">
                         <path d="M8.5 2.5L7.23333 6.36667C7.16847 6.56748 7.05688 6.75003 6.90772 6.8993C6.75856 7.04858 6.57609 7.16032 6.37533 7.22533L2.5 8.5L6.36667 9.76667C6.56748 9.83153 6.75003 9.94312 6.8993 10.0923C7.04858 10.2414 7.16032 10.4239 7.22533 10.6247L8.5 14.5L9.76667 10.6333C9.83153 10.4325 9.94312 10.25 10.0923 10.1007C10.2414 9.95142 10.4239 9.83968 10.6247 9.77467L14.5 8.5L10.6333 7.23333C10.4325 7.16847 10.25 7.05688 10.1007 6.90772C9.95142 6.75856 9.83968 6.57609 9.77467 6.37533L8.5 2.5Z" stroke="#FF8C00" stroke-linecap="round" strokeLinejoin="round"/>
                    </svg>
                    <p>
                        Base branding + web
                    </p>
                </div>
                <div className='w-[250px] '>
                    <p className='text-[#454545]  '>Une identité de marque + un site marketing orienté conversion</p>
                </div>
            </div>
            <p className='text-[40px] '>0€</p>

            <div className='flex flex-col gap-3'>
                <div className='gap-2 items-center flex'>
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16" fill="none">
                        <path d="M13.3334 4L6.00008 11.3333L2.66675 8" stroke="white" stroke-width="1.5" stroke-linecap="round" strokeLinejoin="round"/>
                    </svg>
                    <p>Identité de marque (2 pistes)</p>
                </div>
            </div>

            <Button text={"Démarrer un appel"}/>
        </div>
  )
}
