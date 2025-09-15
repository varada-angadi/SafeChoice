import mongoose from "mongoose";

const chemicalSchema = new mongoose.Schema({
  name: { type: String, required: true, unique: true },
  riskLevel: { type: String, enum: ["Low", "Medium", "High", "Unknown"], default: "Unknown" },
  info: { type: String, default: "" },
  createdAt: { type: Date, default: Date.now },
});

const Chemical = mongoose.model("Chemical", chemicalSchema);

export default Chemical;
