// src/api/openFoodFacts.js
import axios from "axios";

/**
 * Fetch product ingredients from OpenFoodFacts API
 * @param {string} barcode - Product barcode
 * @returns {Promise<{productName: string, ingredients: string[], source: string} | null>}
 */
export async function fetchFoodProduct(barcode) {
  try {
    const url = `https://world.openfoodfacts.org/api/v0/product/${barcode}.json`;
    const res = await axios.get(url);
    const data = res.data;

    if (data && data.status === 1) {
      const product = data.product;
      const ingredientsText = product.ingredients_text || "";
      const ingredients = ingredientsText
        .split(",")
        .map((i) => i.trim())
        .filter(Boolean);

      return {
        productName: product.product_name || "Unknown Product",
        ingredients,
        barcode: product.code || null,
        source: "open_food_facts",
      };
    } else {
      console.warn("Product not found in OpenFoodFacts:", barcode);
      return null;
    }
  } catch (err) {
    console.error("OpenFoodFacts API error:", err.message);
    return null;
  }
}

export default fetchFoodProduct;
