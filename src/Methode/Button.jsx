import React from 'react';

const Button = ({text}) => {
    return (
        <div className='bg-[#ffffff18] border-[#ffffff25] border-[1px] w-fit p-3 rounded-full '>
            <div className='bg-white px-5 py-3 rounded-full font-semibold text-black w-fit '>
            {text}
            </div>
        </div>
    );
};

export default Button;