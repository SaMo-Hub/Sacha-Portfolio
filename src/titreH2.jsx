import React from 'react'

export default function TitreH2({textRefs, text1,text2}) {
  return (
    <h2 ref={textRefs} className="font-medium min-w-max font-urbanist text-5xl">

      {text1.split(" ").map((word, index) => (
          <span key={index} className="inline-block mr-2 ">
            {word}
          </span>
        ))} 
        <br />
        {text2.split(" ").map((word, index) => (
          <span key={index} className="bg-gradient-to-b from-[#777777] swap to-[#414141] bg-clip-text text-transparent font-instrument italic pr-2 inline-block mr-2 pb-1">
            {word}
          </span>
        ))} 
  </h2>
  )
}
