import { fetchIngredientsFromGemini } from "../src/api/geminiAI.js";

async function test() {
  const productName = "Coca-Cola Classic"; // Try any product name
  const result = await fetchIngredientsFromGemini(productName);
  console.log("Gemini AI Result:", result);
}

test();
