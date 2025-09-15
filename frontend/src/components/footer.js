// src/components/Footer.jsx
import React from "react";
import logo from "../assets/logg.png"

export default function Footer() {
  return (
    <footer>
    <hr className="border-t border-[#4C9F38] w-full border-[1.5px]" />
    <div className="flex flex-col items-center justify-center">

    
    <div className="flex flex-row items-center pt-4">
        <img src={logo} alt="logo" className="w-[200px] " />
        <p className="font-tenor text-white text-base tracking-wide">| Making everyday choices safer.</p>
    </div>
    
    <p className="font-tenor text-white text-xs tracking-wide px-2 pt-4">Sources: OpenFoodFacts, OpenBeautyFacts, EWG, AI analysis.</p>
    <p className="font-tenor text-white text-xs tracking-wide px-2 pb-6">Disclaimer: This app does not replace professional medical advice. Data may vary across regions.</p>
    </div>
    </footer>
  );
}
