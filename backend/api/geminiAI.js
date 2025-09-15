import axios from "axios";
import dotenv from "dotenv";

dotenv.config({path:'C:/Users/Asus/safechoice/.env'});
const GEMINI_API_KEY = process.env.GEMINI_API_KEY;

/**
 * Parse raw Gemini response to clean array of ingredients
 * @param {Array<string>} rawIngredients
 * @returns {Array<string>}
 */
function parseGeminiIngredients(rawIngredients) {
  const joined = rawIngredients.join(" ");
  const cleaned = joined.replace(/```json|```/g, "").trim();

  try {
    const parsed = JSON.parse(cleaned);
    if (Array.isArray(parsed)) return parsed.map(i => i.trim());
  } catch (err) {
    // fallback: split by commas
    return cleaned.split(",").map(i => i.trim());
  }

  return [];
}

/**
 * Get product ingredients using Gemini AI
 * @param {string} productName
 * @returns {Promise<{productName:string, ingredients:Array<string>, source:string}>}
 */
export async function fetchIngredientsFromGemini(productName) {
  if (!GEMINI_API_KEY) {
    throw new Error("GEMINI_API_KEY not set in .env");
  }

  try {
    const response = await axios.post(
      "https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent",
      {
        contents: [
          {
            parts: [
              {
                text: `You are a helpful assistant that knows product ingredients. 
Return **only a JSON array of ingredients** for the product "${productName}". 
If unknown, return an empty array.`
              }
            ]
          }
        ]
      },
      {
        headers: {
          "Content-Type": "application/json",
          "X-goog-api-key": GEMINI_API_KEY
        }
      }
    );

    const rawIngredients =
      response.data?.candidates?.[0]?.content?.parts?.[0]?.text || "";

    // Ensure we always return an array
    const ingredients = parseGeminiIngredients([rawIngredients]);

    return {
      productName,
      ingredients,
      barcode: null,
      source: "gemini"
    };
  } catch (err) {
    console.error("Gemini AI error:", err.response?.data || err.message);
    return { productName, ingredients: [], source: "gemini" };
  }
}
