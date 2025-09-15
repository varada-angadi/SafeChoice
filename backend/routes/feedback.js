import express from "express";
import Feedback from "../models/feedback.js"; // make sure .js extension is included

const feedbackRouter = express.Router();

// POST - submit feedback
feedbackRouter.post("/", async (req, res) => {
  try {
    const feedback = new Feedback(req.body);
    await feedback.save();
    res.status(201).json({ success: true, message: "Feedback saved successfully!" });
  } catch (error) {
    console.error("Error saving feedback:", error);
    res.status(500).json({ success: false, message: "Failed to save feedback" });
  }
});

// (Optional) GET - fetch all feedbacks
feedbackRouter.get("/", async (req, res) => {
  try {
    const feedbacks = await Feedback.find().sort({ createdAt: -1 });
    res.json(feedbacks);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch feedbacks" });
  }
});

export default feedbackRouter;
