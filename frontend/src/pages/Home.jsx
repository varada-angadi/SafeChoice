// src/pages/Home.jsx
import React from "react";
import Hero from "../components/hero";
import logo from "../assets/logg.png";
import Footer from "../components/footer";
import { useNavigate } from "react-router-dom";


export default function Home() {
  const navigate = useNavigate();
  return (
    <div className="min-h-screen bg-[#011313]">
      <Hero></Hero>

      <div className="flex flex-col items-center py-6">
      <img src={logo} alt="logo" className="w-[600px]"/>
      <p className="font-tenor text-white w-[600px] text-center tracking-wide pt-2 text-sm">Check everyday products for harmful or carcinogenic chemicals.
        By scanning a barcode, searching a product or searching ingredients, 
        you instantly see its ingredients and safety insight. </p>
      </div>

      <div className="flex justify-center items-center gap-[400px] mt-6">
        <button onClick={() => navigate("/Scan")} className="font-tenor text-white text-4xl tracking-wide font-medium hover:text-[#4C9F38]"> Scan </button>
        <button onClick={() => navigate("/Search")} className="font-tenor text-white text-4xl tracking-wide font-medium hover:text-[#4C9F38]"> Search </button>
      </div>
      <hr className="border-t border-[#4C9F38] w-2/3 mx-auto mt-2 pb-6" />

      <div className="flex flex-col items-center justify-center py-2">
        <p className="font-tenor text-[#4C9F38] text-3xl tracking-wide  px-2 py-2 ">Choose Scan or Search</p>
      
      <p className="font-tenor text-white text-base tracking-wide w-[500px] text-center pb-20 pt-6">
        Not sure where to start? <br/>
        Use Search when you already know the name of a chemical or product and want detailed safety insights. <br/>
        Use Scan when you have the product in hand — simply scan its barcode or label to check its safety instantly.
      </p>
      </div>

      <Footer></Footer>

    </div>

    
  );
}
