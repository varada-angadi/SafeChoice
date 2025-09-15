// src/server.js or src/routes/product.js
import express from "express";
import Product from "../models/Product.js";
import { getProductSafetyInfo } from "../utils/unifiedProductPipeline.js";

/*const router = express.Router();
router.post("/api/product", async (req, res) => {
  console.log("Request body:", req.body);
  try {
    const { barcode, productName } = req.body;
    console.log("Searching for:", barcode || productName);

    if (!barcode && !productName) {
      return res.status(400).json({ success: false, message: "Provide barcode or productName" });
    }

    let product = null;

    // --- Query MongoDB correctly ---
    if (barcode) {
      product = await Product.findOne({ barcode });
    } else if (productName) {
      product = await Product.findOne({ productName });
    }

    // --- Run pipeline if not found ---
    if (!product) {
      const result = await getProductSafetyInfo(barcode || productName);

      if (!result.success) {
        return res.status(404).json(result);
      }

      // Save the full pipeline result to MongoDB
      product = await Product.create({
        productName: result.productName,
        barcode: result.barcode,
        ingredients: result.ingredients,
        source: result.source,
        inferredRisk: result.safetyInsights.overallAssessment,
        safetyInsights: result.safetyInsights,
      });
    }

    // --- Return clean JSON (optional: hide _id and __v if you want) ---
    const { _id, __v, ...cleanProduct } = product.toObject();
    res.json(cleanProduct);

  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, message: "Server error", error: err.message });
  }
});


export default router; */

const router = express.Router();

router.post("/", async (req, res) => {
  try {
    const { productName } = req.body;
    if (!productName) {
      return res.status(400).json({ success: false, message: "Product name required" });
    }

    // Normalize name (to avoid duplicates caused by case/spacing)
    const normalizedName = productName.trim().toLowerCase();

    // 1. Check DB first
    let existingProduct = await Product.findOne({ normalizedName });
    if (existingProduct) {
      console.log("✅ Fetched from DB:", existingProduct.productName);
      return res.json({ success: true, ...existingProduct.toObject() });
    }

    // 2. If not found → run your pipeline
    const newProduct = await getProductSafetyInfo(productName);

    // 3. Save into DB with normalizedName
    const savedProduct = await Product.create({
      ...newProduct,
      normalizedName,
    });

    console.log("📦 Saved new product:", savedProduct.productName);
    return res.json({ success: true, ...savedProduct.toObject() });
  } catch (err) {
    console.error("❌ Error in /api/product:", err.message);
    res.status(500).json({ success: false, message: "Server error" });
  }
});

export default router;

