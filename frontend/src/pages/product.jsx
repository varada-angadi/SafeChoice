// src/pages/ProductDetails.jsx
import React, { useEffect, useState } from "react";
import { useLocation, useParams, useNavigate } from "react-router-dom";
import Footer from "../components/footer";
import axios from "axios";
import logo from "../assets/logg.png";
import left from "../assets/left.png";
import right from "../assets/right.png";

export default function ProductDetails() {
  const { name } = useParams();
  const location = useLocation();
  const navigate = useNavigate();

  const [product, setProduct] = useState(location.state?.product || null);
  const [loading, setLoading] = useState(!product);
  const [error, setError] = useState("");

  useEffect(() => {
    if (!product && name) {
      const fetchProduct = async () => {
        setLoading(true);
        setError("");
        try {
          const res = await axios.post("/api/product", { productName: decodeURIComponent(name) });
          setProduct(res.data);
        } catch (err) {
          console.error(err);
          setError(err.response?.data?.message || "Product not found");
        } finally {
          setLoading(false);
        }
      };
      fetchProduct();
    }
  }, [name, product]);

  const goToChemical = (ingredient) => {
    navigate(`/chemical/${encodeURIComponent(ingredient)}`);
  };

  if (loading) return <p className="text-white text-center mt-8">Loading...</p>;
  if (error) return <p className="text-red-500 text-center mt-8">{error}</p>;

  const rating = product.safetyInsights?.ratingOutOf10 || 0;
  const assessment = product.safetyInsights?.overallAssessment || "Unknown";

  const getRatingStyles = (rating) => {
  if (rating >= 8) {
    return {
      border: "border-[#CD1C10]",
      text: "text-[#CD1C10]",
    };
  } else if (rating >= 5) {
    return {
        border: "border-[#FFCC00]",
      text: "text-[#FFCC00]",
    };
  } else {
    return {
    border: "border-[#4C9F38]",
      text: "text-[#4C9F38]",
      
    };
  }
};

const styles = getRatingStyles(rating);


  return (

    <div className="min-h-screen bg-[#011313] flex flex-col">
      {/* Header */}
      <div className="grid grid-cols-3 items-center px-6 py-4 text-white font-tenor">
        {/* Left Button */}
        <button onClick={() => navigate("/")} className="flex flex-row items-center">
            <img src={left} alt="Left" className="w-[50px]" />
            <p className="font-tenor text-white tracking-wide text-lg">Home</p>
        </button>

        {/* Centered Logo */}
        <div className="flex justify-center">
            <img src={logo} alt="logo" className="w-[400px]" />
        </div>

        {/* Right Button */}
        <button onClick={() => navigate("/Search")} className="flex flex-row items-center justify-end">
            <p className="font-tenor text-white tracking-wide text-lg">Search Product</p>
            <img src={right} alt="Right" className="w-[50px]" />
        </button>
        </div>


        <h1 className="font-tenor text-white tracking-wide text-4xl font-bold text-center flex-1 pt-6">{product.productName}</h1>
      
      {/* Main Content */}
    
    <div className="flex flex-col items-center mt-6 px-6 pt-6 w-full">
  
        {/* Top Section: Rating + Safety Info */}
        <div className="w-full flex justify-center items-center">
  <div className="flex flex-row items-center justify-center gap-12 max-w-5xl w-full px-6">

            
            {/* Rating Circle */}
            <div className={`w-32 h-32 rounded-full border-8 flex flex-col items-center justify-center ${styles.border}`}>
            <span className={`text-5xl ${styles.text}`}>{rating}</span>
            <span className="text-white text-2xl ml-1">/10</span>
            </div>

            {/* Safety Info */}
            <div className="text-left text-white w-full max-w-xl">
            <p className="font-tenor text-white tracking-wide text-xl pb-2 flex-1">
                <span>Carcinogenic Ingredients:</span>{" "}
                {product.safetyInsights?.carcinogenicIngredients?.length > 0 ? (
                product.safetyInsights.carcinogenicIngredients.map((ing, idx) => (
                    <span
                    key={idx}
                    className="inline-block bg-[#014b49] text-white px-3 py-1 rounded-full text-sm mr-2 cursor-pointer"
                    onClick={() => goToChemical(ing)}
                    >
                    {ing}
                    </span>
                ))
                ) : (
                <span className="font-tenor text-white tracking-wide text-xl  flex-1">None</span>
                )}
            </p>

            <p className="pb-2">
                <span className="font-tenor text-white tracking-wide text-xl flex-1">Overall Safety Assessment: </span>{" "}
                <span
                className={
                    assessment.includes("concern")
                    ? "font-tenor tracking-wide text-xl flex-1 text-red-500 font-bold"
                    : assessment.includes("Safe")
                    ? "font-tenor tracking-wide text-xl flex-1 text-green-500 font-bold"
                    : "font-tenor tracking-wide text-xl flex-1 text-yellow-400 font-bold"
                }
                >
                {assessment}
                </span>
            </p>

            <p className="font-tenor text-white tracking-wide text-xl flex-1">
                <span>Source: </span> 
                <span>{product.source}</span>
            </p>
            </div>
        </div>
        </div>

  {/* Ingredients Section (Full Width) */}
  <div className="w-full mt-10 mb-20">
    <h2 className="font-tenor text-white tracking-wide text-4xl flex-1 font-bold text-center pb-6">Ingredients</h2>
    <div className="flex flex-wrap gap-3 max-w-5xl mx-auto justify-center">
      {product.ingredients.map((ing, idx) => {
        const isCarcinogenic = product.safetyInsights?.carcinogenicIngredients?.includes(ing);
        const isPotentiallyHarmful = product.safetyInsights?.potentiallyHarmfulIngredients?.includes(ing);

        return (
          <span
            key={idx}
            onClick={() => goToChemical(ing)}
            className={`cursor-pointer px-4 py-2 rounded-full text-sm transition ${
              isCarcinogenic
                ? "bg-red-600 text-white"
                : isPotentiallyHarmful
                ? "bg-yellow-400 text-black"
                : "bg-[#014b49] text-white"
            } hover:opacity-80`}
          >
            {ing}
          </span>
        );
      })}
    </div>
  </div>
</div>
<div className="mt-auto"> <Footer /></div>
</div>
);
}
