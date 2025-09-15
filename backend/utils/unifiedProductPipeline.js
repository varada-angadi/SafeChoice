// unifiedProductPipeline.js
import { fetchProductIngredients } from "./fetchProductIngrediants.js";
import { analyzeIngredients } from "./analyseRisk.js";

export async function getProductSafetyInfo(barcodeOrName) {
  try {
    let product;

    if (/^\d+$/.test(barcodeOrName)) {
      product = await fetchProductIngredients({ barcode: barcodeOrName });
    } else {
      product = await fetchProductIngredients({ productName: barcodeOrName });
    }

    if (!product || !product.ingredients || product.ingredients.length === 0) {
      return {
        success: false,
        message: "No product or ingredients found.",
        product,
      };
    }

    // Run risk analysis
    const safetyInsights = await analyzeIngredients({
      productName: product.productName,
      barcode: product.barcode,
      ingredients: product.ingredients,
    });

    // ✅ Return clean, non-duplicated JSON
    return {
      success: true,
      productName: product.productName || "Unknown",
      barcode: product.barcode || null,
      ingredients: product.ingredients,
      source: product.source,
      safetyInsights,
    };
  } catch (error) {
    console.error("Pipeline Error:", error.message);
    return {
      success: false,
      message: "Error analyzing product safety.",
      error: error.message,
    };
  }
}

/*

 * Main pipeline: Fetch product + analyze safety
 * @param {string} barcodeOrName - Either a numeric barcode or product name

export async function getProductSafetyInfo(barcodeOrName) {
  try {
    let product;

    // --- Detect barcode vs product name ---
    if (/^\d+$/.test(barcodeOrName)) {
      // All digits → treat as barcode
      product = await fetchProductIngredients({ barcode: barcodeOrName });
    } else {
      // Otherwise treat as product name
      product = await fetchProductIngredients({ productName: barcodeOrName });
    }

    // --- Handle missing product/ingredients ---
    if (!product || !product.ingredients || product.ingredients.length === 0) {
      return {
        success: false,
        message: "No product or ingredients found.",
        product,
      };
    }

    // --- Run risk analysis ---
    const safetyInsights = await analyzeIngredients({
      productName: product.productName,
      barcode: product.barcode,
      ingredients: product.ingredients,
    });

    // --- Return unified result ---
    return {
      success: true,
      productName: product.productName || "Unknown",
      barcode: product.barcode || null,
      ingredients: product.ingredients,
      source: product.source,
      safetyInsights,
    };
  } catch (error) {
    console.error("Pipeline Error:", error.message);
    return {
      success: false,
      message: "Error analyzing product safety.",
      error: error.message,
    };
  }
} */
