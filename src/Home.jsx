import React from 'react';
// import Test from './test';
import Header from './Header';
import Test from './test';
import Logiciel from './Logiciel';
import VisionDevienLegende from './VisionDevienLegende';
import Princing from './Princing';
import FAQ from './FAQ';


const Home = () => {
    return (
        <div className='bg-black -hidden '>
            
            <Header/>
            <Test/>
           
            <Logiciel/>   
            {/* <VisionDevienLegende/> */}
            <Princing/>
            <FAQ/> 
        </div>
    );
};

export default Home;