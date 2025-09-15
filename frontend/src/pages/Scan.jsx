// src/pages/Scan.jsx
import {React, useState} from "react";
import Hero from "../components/hero";
import logo from "../assets/logg.png";
import Footer from "../components/footer";
import ScanLogo from "../assets/barcode-scan.png";
import { useNavigate, useLocation } from "react-router-dom";
import BarcodeScanner from "../components/barcode.jsx";
import axios from "axios";

export default function Scan() {
  const navigate = useNavigate();
  const location = useLocation();

  const [barcode, setBarcode] = useState("");
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  // Function to fetch product info
  const fetchProductByBarcode = async (code) => {
    setLoading(true);
    setError("");
    try {
      const res = await axios.post("/api/products", { productName: code });
      console.log("Fetched from backend:", res.data);

      // redirect to ProductDetails page with product info
      navigate(`/product/${encodeURIComponent(res.data.productName)}`, {
        state: { product: res.data },
      });
    } catch (err) {
      console.error("Error fetching product:", err);
      setError(err.response?.data?.message || "Product not found or API error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#011313] flex flex-col">
      <Hero />

      {/* Logo & Description */}
      <div className="flex flex-col items-center py-6 px-4 md:px-0">
        <img src={logo} alt="logo" className="w-[300px] md:w-[500px]" />
        <p className="font-tenor text-white text-center tracking-wide pt-2 text-sm md:w-[600px]">
          Check everyday products for harmful or carcinogenic chemicals. By
          scanning a barcode, searching a product or searching ingredients, you
          instantly see its ingredients and safety insight.
        </p>
      </div>

      {/* Navigation Tabs */}
      <div className="flex justify-center items-center gap-10 md:gap-[400px] mt-2">
        <button
          onClick={() => navigate("/Scan")}
          className="font-tenor text-white text-3xl tracking-wide font-medium hover:text-[#4C9F38]"
        >
          Scan
        </button>
        <button
          onClick={() => navigate("/Search")}
          className="font-tenor text-white text-3xl tracking-wide font-medium hover:text-[#4C9F38]"
        >
          Search
        </button>
      </div>

      {/* Underline Indicator */}
      <div className="relative w-2/3 mx-auto mt-2 pb-6">
        <hr className="border-t border-[#4C9F38]" />
        <hr
          className={`absolute top-0 border-t-4 ${
            location.pathname === "/Scan"
              ? "border-[#4C9F38] w-1/2 left-0"
              : location.pathname === "/Search"
              ? "border-[#4C9F38] w-1/2 left-1/2"
              : ""
          }`}
        />
      </div>

      {/* Scanner Section */}
      <div className="flex flex-col items-center justify-center pb-12 w-full px-4 md:px-0">
        {!barcode && (
          <>
            <img
              src={ScanLogo}
              alt="ScanImage"
              className="w-[100px] pb-6 opacity-40"
            />
            <p className="font-tenor text-white text-center tracking-wide pt-4 text-lg md:w-[400px]">
              Point your camera at a product barcode. We’ll instantly check
              ingredients and show you if it’s safe.
            </p>
          </>
        )}

        {/* ✅ Only one BarcodeScanner */}
        <BarcodeScanner
          onDetected={(code) => {
            setBarcode(code);
            fetchProductByBarcode(code); // auto-search
          }}
          onError={(err) => setError(err.message || "Camera error")}
        />

        {/* Status Messages */}
        {loading && <p className="text-white mt-4">Searching product...</p>}
        {error && <p className="text-red-500 mt-4">{error}</p>}
      </div>

      <Footer />
    </div>
  );
}
