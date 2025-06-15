import React from 'react'
import { projectList } from '../projectList'
import { Link } from 'react-router'

export const GridProjet = () => {
  return (
    <div className='mx-12 mt-24 grid-cols-3 grid border-t border-l '>
        {projectList.map((item,index)=>(
            <Link to={`/projets/${item.id} `} className='border-b group relative uppercase flex flex-col font-supply text-xs gap-24 p-5 border-r'>
            <p className='z-10 group-hover:text-white'>{index+1} </p>
            <div className='relative '>
                <div>

                <p>{item.categorie} </p>
                <p>{item.date} </p>
                </div>
                <p className='mt-8 text-sm'>{item.name} </p>
            <img className='group-hover:opacity-100 opacity-0 absolute z-10 top-0 h-full' src={item.logo} alt="" />
            </div>
            <div
              // style={{backgroundColor:item.textColor}}
            className='group-hover:opacity-100 opacity-0 absolute top-0 left-0 bg-[#2D2D2D] w-full h-full'>

            </div>
        </Link>
        ))}
    </div>
  )
}
