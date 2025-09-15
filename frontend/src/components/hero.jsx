import React from 'react';
import search from "../assets/search.png";
import home from "../assets/home.png";
import info from "../assets/info.png";
import info1 from "../assets/info1.png";
import home1 from "../assets/home1.png";
import feedback from "../assets/feedback.png";
import feedback1 from "../assets/feedback1.png";
import { useNavigate, useLocation } from "react-router-dom";



export default function Hero() {
    const navigate = useNavigate();
    const location = useLocation();
    const isActive = (path) => location.pathname === path;
    
    return(
  <div className="bg-[#003739] w-full h-[80px] flex items-center justify-start px-4">
    <div className="flex items-center bg-[#011313] rounded-[10px] px-4 py-2 w-3/4">
        <img src={search} alt="Search" className="w-[20px] h-[20px]" />
        <input type="text" placeholder="Search for any particular chemical..."
        className="font-tenor text-lg flex-1 bg-[#011313] text-gray-400 placeholder-gray-400 outline-none px-4"/>
    </div>

    <div className='flex items-center gap-20 px-12'>
        <button onClick={() => navigate("/")} className='flex flex-col items-center'>
            <img src={isActive("/") ? home : home1} alt={isActive("/") ? "Home Active":"Home"} className="w-[25px]" />
            <p className={` ${
              isActive("/") ? "text-[#4C9F38] font-tenor text-sm font-medium" 
              : "text-[#011313] font-tenor text-sm font-medium"}`}>Home</p>
        </button>

        <button onClick={() => navigate("/Feedback")} className='flex flex-col items-center'>
        <img src={isActive("/Feedback") ? feedback : feedback1} alt={isActive("/Feedback") ? "Scan Active":"Scan"} className="w-[25px]" />
            <p className={` ${
              isActive("/Feedback") ? "text-[#4C9F38] font-tenor text-sm font-medium" 
              : "text-[#011313] font-tenor text-sm font-medium"}`}>Feedback</p>
        </button>

        <button onClick={() => navigate("/Info")} className='flex flex-col items-center'>
        <img src={isActive("/Info") ? info : info1} alt={isActive("/Info") ? "Info Active":"Info"} className="w-[25px]" />
            <p className={` ${
              isActive("/Info") ? "text-[#4C9F38] font-tenor text-sm font-medium" 
              : "text-[#011313] font-tenor text-sm font-medium"}`}>Info</p>
        </button>

    </div>

    </div>

);
}
