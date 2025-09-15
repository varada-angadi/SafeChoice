// src/pages/Search.jsx
import React, { useState } from "react";
import Hero from "../components/hero";
import logo from "../assets/logg.png";
import Footer from "../components/footer";
import SearchLogo from "../assets/global-research.png";
import SearchSvg from "../assets/search.png"
import { useNavigate, useLocation } from "react-router-dom";
import axios from "axios";

export default function Search() {
const [query, setQuery] = useState("");
const [loading, setLoading] = useState(false);
const [error, setError] = useState("");

const fetchProduct = async () => {
  if (!query.trim()) return setError("Please enter a product name or barcode");
  setLoading(true);
  setError("");

  try {
    console.log("Searching for:", query.trim()); // Step to debug
    const res = await axios.post("/api/products", { productName: query.trim() });
    console.log("Response from backend:", res.data);

    // Redirect to ProductDetails page
    navigate(`/product/${encodeURIComponent(res.data.productName)}`, { state: { product: res.data } });
  } catch (err) {
    console.error("Error fetching product:", err.response?.data?.message || err.message);
    setError(err.response?.data?.message || "Product not found or API error");
  } finally {
    setLoading(false);
  }
};










  const navigate = useNavigate();
  const location = useLocation();
  return (
    <div className="min-h-screen bg-[#011313]">
      <Hero></Hero>

      <div className="flex flex-col items-center py-6">
        <img src={logo} alt="logo" className="w-[500px]"/>
        <p className="font-tenor text-white w-[600px] text-center tracking-wide pt-2 text-sm">Check everyday products for harmful or carcinogenic chemicals.
        By scanning a barcode, searching a product or searching ingredients, 
        you instantly see its ingredients and safety insight. </p>
      </div>

      <div className="flex justify-center items-center gap-[400px] mt-2">
        <button onClick={() => navigate("/Scan")} className="font-tenor text-white text-3xl tracking-wide font-medium hover:text-[#4C9F38]"> Scan </button>
        <button onClick={() => navigate("/Search")} className="font-tenor text-white text-3xl tracking-wide font-medium hover:text-[#4C9F38]"> Search </button>
      </div>
      <div className="relative w-2/3 mx-auto mt-2 pb-6 ">
        <hr className="border-t border-[#4C9F38]" />
        <hr
    className={`absolute top-0 border-t-4
      ${location.pathname === '/Scan'
        ? 'border-[#4C9F38] w-1/2 left-0'
        : location.pathname === '/Search'
        ? 'border-[#4C9F38] w-1/2 left-1/2'
        : ''
      }`}
  />
      </div>

      <div className="flex flex-col items-center justify-center pb-12">
      <img src={SearchLogo} alt="ScanImage" className="w-[100px] pb-6 opacity-40"></img>

      <div className="flex items-center justify-center bg-[#003739] rounded-full px-4 py-2 w-2/4 h-[40px]">
              <img src={SearchSvg} alt="Search" className="w-[20px] h-[20px]" />
              <input type="text" placeholder="Search for any Barcode number or Type Product name..."
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              onKeyDown={(e) => {
    if (e.key === "Enter") {
      fetchProduct();
    }
  }}
              className="font-tenor text-lg flex-1 bg-[#003739] text-gray-400 placeholder-gray-400 outline-none px-4"/>
      </div>

      {loading && <p className="text-white mt-2">Loading...</p>}
{error && <p className="text-red-500 mt-2">{error}</p>}


      <p className="font-tenor text-white w-[400px] text-center tracking-wide pt-8 text-lg">
        Type the product name or enter the barcode number from packaging.We’ll instantly check ingredients and show you if it’s safe.
      </p>
      </div>


      <Footer></Footer>

    </div>

    
  );
}
