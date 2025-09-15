// src/api/openBeautyFacts.js
import axios from 'axios';

async function fetchBeautyProduct(barcode) {
  try {
    const url = `https://world.openbeautyfacts.org/api/v2/product/${barcode}.json`;
    const res = await axios.get(url);
    const data = res.data;

    if (data && data.status === 1) {
      const product = data.product;
      const ingredientsText = product.ingredients_text || product.ingredients || "";
      const ingredients = ingredientsText
        .split(',')
        .map(i => i.trim())
        .filter(Boolean);

      return {
        productName: product.product_name || product.brands || "Unknown Beauty Product",
        ingredients,
        barcode: product.code || null,
        source: "open_beauty_facts"
      };
    } else {
      return null;
    }
  } catch (err) {
    console.error("OpenBeautyFacts API error:", err.message);
    return null;
  }
}

export default fetchBeautyProduct;
