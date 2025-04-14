const express = require("express");
const Question = require("../models/Question");
const authMiddleware = require("../middleware");

const router = express.Router();

// নতুন প্রশ্ন পোস্ট করা
router.post("/", authMiddleware, async (req, res) => {
  try {
    const { title, description } = req.body;
    const newQuestion = new Question({
      title,
      description,
      user: req.user.id,
    });
    await newQuestion.save();
    res.status(201).json(newQuestion);
  } catch (error) {
    res.status(500).json({ error: "Server error" });
  }
});

// get all question
router.get("/", async (req, res) => {
  try {
    const questions = await Question.find().populate("user", "username");
    res.json(questions);
  } catch (error) {
    res.status(500).json({ error: "Server error" });
  }
});
// search=====================
router.get("/search", async (req, res) => {
  try {
    const { query, category } = req.query;
    let filter = {};

    if (query) {
      filter.$or = [
        { title: { $regex: query, $options: "i" } },
        { description: { $regex: query, $options: "i" } },
      ];
    }

    if (category) {
      filter.category = category;
    }

    const questions = await Question.find(filter).sort({ createdAt: -1 });
    res.json(questions);
  } catch (error) {
    res.status(500).json({ error: "Server error" });
  }
});


module.exports = router;
