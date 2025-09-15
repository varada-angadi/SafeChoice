import React from "react";
import { FaSkullCrossbones, FaVirus, FaFire } from "react-icons/fa";
import Hero from "../components/hero";
import Footer from "../components/footer";



// Mock data for charts
const carcinogenTypes = [
  { name: "Chemical", value: 50, color: "#FF4C4C" },
  { name: "Physical", value: 30, color: "#FFA500" },
  { name: "Biological", value: 20, color: "#4CAF50" },
];


const commonCarcinogens = [
  { product: "Cosmetics", examples: "Formaldehyde, Parabens", source: "IARC, NTP" },
  { product: "Food", examples: "Processed meat, Smoked foods", source: "IARC" },
  { product: "Cleaning agents", examples: "Certain solvents, detergents", source: "NTP" },
  { product: "Tobacco products", examples: "Nicotine, Tar, Benzene", source: "IARC, WHO" },
  { product: "Household items", examples: "Pesticides, Flame retardants", source: "IARC" },
];
export default function Info() {

  return (

    <div className="min-h-screen bg-[#011313]">
      <Hero></Hero>
      
      {/* Hero Section */}
      <div className="font-tenor text-white mx-6">
      <section className="text-center mb-8">
        <h1 className="font-tenor text-5xl my-4">Understanding Carcinogens</h1>
        <div className="py-2 text-base items-center justify-center ">
          This information is meant to help you stay cautious and spread awareness. It is not meant to create fear. Lead a healthy life, one step at a time!  
        </div>
      </section>

      {/* What is a Carcinogen */}
      <section className="mb-12">
        <h2 className="text-2xl font-semibold mb-3 text-white">What is a Carcinogen?</h2>
        <p className="text-white">
          • A carcinogen is anything that has potential to cause cancer. 
         </p>
         <p className="text-white">
          • Carcinogens can damage DNA in cells or interfere with normal cell processes, potentially leading to uncontrolled cell growth.
          </p>
       
        <p className="text-white">
          • Important to remember that being exposed to a carcinogen doesn't automatically mean you will get cancer. 
          </p>
          <p className="text-white">
          • The risk depends on many factors, including the type of carcinogen, how much you're exposed to, the duration of exposure, and your own genetics.
        </p>
      </section>

      <section className="mb-12">
        <h2 className="text-2xl font-semibold mb-3 text-white">How Carcinogens Cause Cancer?</h2>
        <p>
          At its core, cancer is a disease of the cells. Our bodies are made of trillions of cells that grow, divide, 
          and die in an orderly fashion. Inside each cell is DNA, which acts like a instruction manual for how the cell should behave.
          Carcinogens disrupt this process by damaging the cell's DNA. When the DNA gets damaged, 
          the instructions can get messed up, leading to a mutation. Sometimes, a cell can repair this damage, 
          but if it doesn't, the mutated cell can start to grow and divide uncontrollably. 
          This uncontrolled growth is what forms a tumor, or cancer.
         </p>
      </section>

      <section className="mb-12">
        <h2 className="text-2xl font-semibold mb-3 ">Who Decides if Something Is a Carcinogen??</h2>
        <p>
          <span className="text-xl semi-bold">• The International Agency for Research on Cancer (IARC): </span><br/>
          Part of the World Health Organization (WHO), 
          IARC evaluates and classifies agents into a tiered system based on the strength of scientific evidence.<br/>
        </p>
        <p className="mt-6">
         <span className="text-xl semi-bold">• The National Toxicology Program (NTP):</span><br/>
          A U.S. government program that publishes a "Report on Carcinogens" 
          listing substances that are "known" or "reasonably anticipated" to cause cancer in humans.
         </p>
      </section>



      {/* Types of Carcinogens */}
      <section className="mb-12">
        <h2 className="text-2xl font-semibold mb-6">Types of Carcinogens</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {carcinogenTypes.map((type) => (
            <div key={type.name} className="bg-[#003739] p-6 rounded-lg shadow flex flex-col items-center text-center">
              {type.name === "Chemical" && <FaSkullCrossbones className="text-red-500 w-10 h-10" />}
              {type.name === "Physical" && <FaFire className="text-orange-500 w-10 h-10" />}
              {type.name === "Biological" && <FaVirus className="text-green-500 w-10 h-10" />}
              <h3 className="text-xl font-bold mt-4">{type.name}</h3>
              <p className="mt-2">
                {type.name === "Chemical" ? "Tobacco, Benzene" : type.name === "Physical" ? "UV, X-rays" : "HPV, Hepatitis B"}
              </p>
            </div>
          ))}
        </div>
      </section>

      
{/* Common Carcinogens */}
<section className="mb-12">
  <h2 className="text-2xl font-semibold mb-6">Common Carcinogens in Products</h2>
  <div className="overflow-x-auto">
    <table className="min-w-full rounded-lg shadow overflow-hidden border-collapse">
      <thead className="border-b border-gray-300">
        <tr>
          <th className="px-4 py-2 text-left">Product</th>
          <th className="px-4 py-2 text-left">Carcinogen Examples</th>
          <th className="px-4 py-2 text-left">Source</th>
        </tr>
      </thead>
      <tbody>
        {commonCarcinogens.map((item, index) => (
          <tr key={index}>
            <td className="px-4 py-2">{item.product}</td>
            <td className="px-4 py-2">{item.examples}</td>
            <td className="px-4 py-2">{item.source}</td>
          </tr>
        ))}
      </tbody>
    </table>
  </div>
</section>


      </div>




      <Footer></Footer>

    </div>

    
  );
}
