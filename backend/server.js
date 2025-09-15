import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import mongoose from "mongoose";

import router from "./routes/product.js";
import feedbackRouter from "./routes/feedback.js";

dotenv.config({ path: "C:/Users/Asus/safechoice/.env" });

const app = express();
app.use(cors());
app.use(express.json());

// Connect to MongoDB
mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log("✅ MongoDB connected"))
.catch(err => console.error("❌ MongoDB connection error:", err));

// Routes
app.use("/api/products", router);         // your product routes
app.use("/api/feedback", feedbackRouter); // feedback routes

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
