import mongoose from "mongoose";
import Product from "../models/Product.js";
import Chemical from "../models/Chemical.js";
import dotenv from "dotenv";

dotenv.config();

// 🔑 Replace with your MongoDB Atlas or local URI
const MONGO_URI = process.env.MONGODB_URI;

async function run() {
  try {
    await mongoose.connect(MONGO_URI);
    console.log("✅ MongoDB connected!");

    // Dummy Product
    const product = new Product({
      productName: "Test Lotion",
      barcode: "1234567890",
      ingredients: ["Water", "Alcohol", "Paraben"],
      source: "api",
      inferredRisk: "Medium",
    });

    await product.save();
    console.log("✅ Dummy Product saved:", product);

    // Dummy Chemical
    const chemical = new Chemical({
      name: "Paraben",
      riskLevel: "High",
      info: "Linked to potential endocrine disruption.",
    });

    await chemical.save();
    console.log("✅ Dummy Chemical saved:", chemical);

    await mongoose.disconnect();
    console.log("🔌 Disconnected.");
  } catch (err) {
    console.error("❌ Error:", err);
  }
}

run();
