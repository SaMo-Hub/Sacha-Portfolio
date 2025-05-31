import React from 'react'
import { Link } from 'react-router'

export const Footer = () => {
  return (
    <footer className='z-10 relative mx-12 py-12 border-t flex justify-between font-supply items-end text-xs uppercase'>
        <div className='  flex  items-end gap-12 f'>
           
            <ul>
                <li>
                    home
                </li>
                <li>
                    about
                </li>
                <li>
                    portofolio
                </li>
            </ul>
            <ul>
               
                <li>
                    instagram
                </li>
                <li>
                    linkedin
                </li>
            </ul>
        </div>
        <Link to={'mailot:smoricet.contact@gmail.com'}>smoricet.contact@gmail.com</Link>
    </footer>
  )
}
