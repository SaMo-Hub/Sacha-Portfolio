import React from 'react';

const Button = ({text}) => {
    return (
        <div className='bg-[#ffffff18] font-urbanist  relative border-[#ffffff25] overflow-hidden group border-[1px] w-fit p-2 rounded-full '>
            <div className='bg-white overflow-visible relative px-5 py-3 rounded-full  font-semibold text-black w-fit '>
             <span className='z-10 font-medium relative'>
                {text}
            </span>
            <div className="ease-in-out duration-300 transition-all absolute z-0 w-full h-full inset-0 rounded-full scale-y-100 scale-100 group-hover:scale-110 group-hover:scale-y-[1.5] bg-[#fafafa] "></div>
            </div>
        </div>
    );
};

export default Button;