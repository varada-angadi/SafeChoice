// src/fetch/fetchProductIngredients.js
import { fetchIngredientsFromGemini } from "../api/geminiAI.js";
import fetchFoodProduct from "../api/openFoodFacts.js";
import fetchBeautyProduct from "../api/openBeautyFacts.js";
import searchEwgProduct from "../scrapers/ewgScraper.js";

/**
 * Fetch product ingredients from multiple sources in order:
 * 1. API sources (Food & Beauty)
 * 2. EWG Scraper
 * 3. Gemini AI Fallback
 *
 * Returns a uniform product object:
 * { productName, barcode, ingredients, source }
 */
export async function fetchProductIngredients({ barcode, productName }) {
  let product = null;

  // --- 1. Try OpenFoodFacts (barcode) ---
  if (barcode) {
    product = await fetchFoodProduct(barcode);
    if (product) product.source = "open_food_facts";
  }

  // --- 2. Try OpenBeautyFacts (barcode) ---
  if (!product && barcode) {
    product = await fetchBeautyProduct(barcode);
    if (product) product.source = "open_beauty_facts";
  }

  // --- 3. Try EWG Scraper (productName) ---
  if (!product && productName) {
    product = await searchEwgProduct(productName);
    if (product) product.source = "ewg";
  }

  // --- 4. AI Fallback ---
  if (!product && productName) {
    product = await fetchIngredientsFromGemini(productName);
    if (product) product.source = "gemini";
  }

  // --- Ensure uniform structure ---
  if (product) {
    return {
      productName: product.productName || productName || "Unknown Product",
      barcode: product.barcode || barcode || null,
      ingredients: product.ingredients || [],
      source: product.source || "unknown",
    };
  }

  // If nothing found, return empty uniform object
  return {
    productName: productName || "Unknown Product",
    barcode: barcode || null,
    ingredients: [],
    source: "none",
  };
}
