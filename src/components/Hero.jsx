import React from 'react';
import image1 from './images/image1.jpg';

function Hero() {
    return (
        <div className="pt-24 p-4 bg-[#0078AD] flex flex-col md:flex-row text-center justify-center items-center">
            <div className="md:w-1/2">
                <h1 className="text-white font-bold text-3xl md:text-6xl leading-tight mb-4">
                    All your daily necessities <br className="hidden md:block" /> available here
                </h1>
                <h3 className="text-white text-xl md:text-2xl">SONI SUPER STORE</h3>
            </div>

            <div className="mt-6 md:mt-0 md:w-1/2 flex justify-center">
                <img src={image1} alt="Store items" className="w-3/4 md:w-full object-cover rounded-md" />
            </div>
        </div>
    );
}

export default Hero;
