// models/Product.js
/*import mongoose from "mongoose";

const ProductSchema = new mongoose.Schema({
  productName: String,
  barcode: String,
  ingredients: [String],
  source: String,
  inferredRisk: String, // optional summary
  safetyInsights: {
    carcinogenicIngredients: [String],
    potentiallyHarmfulIngredients: [String],
    overallAssessment: String,
    ratingOutOf10: Number
  },
  createdAt: { type: Date, default: Date.now }
});

export const Product = mongoose.model("Product", ProductSchema);*/

import mongoose from "mongoose";

const productSchema = new mongoose.Schema({
  productName: { type: String, required: true },
  normalizedName: { type: String, index: true }, // 👈 new field for consistent search
  barcode: String,
  ingredients: [String],
  source: String,
  inferredRisk: String,
  safetyInsights: Object,
}, { timestamps: true });

export default mongoose.model("Product", productSchema);

