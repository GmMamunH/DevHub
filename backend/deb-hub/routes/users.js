const express = require("express");
const router = express.Router();
const User = require("../models/User");
const Question = require("../models/Question");
const Answer = require("../models/Answer");
const authMiddleware = require("../middleware");

// ইউজার প্রোফাইল ডাটা
router.get("/profile/:userId", authMiddleware, async (req, res) => {
  try {
    const user = await User.findById(req.params.userId).select("-password");
    if (!user) return res.status(404).json({ error: "User not found" });

    const questions = await Question.find({ user: req.params.userId }).sort({
      createdAt: -1,
    });
    const answers = await Answer.find({ user: req.params.userId }).sort({
      createdAt: -1,
    });

    res.json({ user, questions, answers });
  } catch (error) {
    res.status(500).json({ error: "Server error" });
  }
});

module.exports = router;
