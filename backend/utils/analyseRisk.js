// src/analyze/analyzeIngredients.js
import carcinogens from "../data/carcinogens.json" with { type: "json" };
import axios from "axios";
import dotenv from "dotenv";

dotenv.config();
const GEMINI_API_KEY = process.env.GEMINI_API_KEY;

/**
 * Fetch contextual insight for unknown ingredients using Gemini AI
 */
async function fetchAIInsight(ingredientList) {
  if (!ingredientList.length) return [];

  const prompt = `
You are a scientific advisor. Given a list of ingredients, provide contextual safety notes for each.
Return ONLY JSON in this structure:

[
  {
    "ingredient": "<ingredient name>",
    "notes": "<brief safety explanation>"
  }
]

Ingredients: ${JSON.stringify(ingredientList)}
`;

  try {
    const response = await axios.post(
      "https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent",
      {
        contents: [{ parts: [{ text: prompt }] }],
      },
      {
        headers: {
          "Content-Type": "application/json",
          "X-goog-api-key": GEMINI_API_KEY,
        },
      }
    );

    const aiText =
      response.data.candidates?.[0]?.content?.parts?.[0]?.text || "[]";

    // Parse AI JSON safely
    try {
      return JSON.parse(aiText);
    } catch {
      // fallback: return empty array if AI response is malformed
      return [];
    }
  } catch (err) {
    console.error("AI Insight Error:", err.message);
    return [];
  }
}

/**
 * Main function to analyze product ingredients
 */
export async function analyzeIngredients({ productName, barcode, ingredients }) {
  const carcinogenicIngredients = [];
  const unknownIngredients = [];

  // Normalize ingredients for matching
  const normalizedIngredients = ingredients.map((i) => i.trim().toLowerCase());

  normalizedIngredients.forEach((ing, idx) => {
    const match = carcinogens.find((c) => c.name.toLowerCase() === ing);
    if (match) {
      carcinogenicIngredients.push(match.name);
    } else {
      unknownIngredients.push(ingredients[idx]); // keep original capitalization
    }
  });

  // Fetch AI insights for unknown ingredients
  const aiInsights = await fetchAIInsight(unknownIngredients);

  // Compute rating more fairly
  let ratingOutOf10 = 1;

  // Carcinogens weigh heavily
  ratingOutOf10 += carcinogenicIngredients.length * 3;

  // Check AI notes for flagged terms
  aiInsights.forEach((item) => {
    const notes = item.notes.toLowerCase();
    if (notes.includes("carcinogen") || notes.includes("cancer")) {
      ratingOutOf10 += 3;
    } else if (
      notes.includes("irritant") ||
      notes.includes("allergy") ||
      notes.includes("avoid")
    ) {
      ratingOutOf10 += 2;
    } else {
      // marked safe or neutral → no penalty
      ratingOutOf10 += 0;
    }
  });

  if (ratingOutOf10 > 10) ratingOutOf10 = 10;

  const overallAssessment =
    ratingOutOf10 <= 3
      ? "Safe for regular use"
      : ratingOutOf10 <= 6
      ? "Use with caution"
      : "Potential health concern";

  return {
      carcinogenicIngredients,
      potentiallyHarmfulIngredients: aiInsights,
      overallAssessment,
      ratingOutOf10,
    
  };
}
