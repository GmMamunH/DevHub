const express = require("express");
const router = express.Router();
const User = require("../models/User");
const Question = require("../models/Question");
const Answer = require("../models/Answer");
const authMiddleware = require("../middleware");

router.get("/profile/:userId", authMiddleware, async (req, res) => {
  try {
    const user = await User.findById(req.params.userId).select("-password");
    if (!user) return res.status(404).json({ error: "User not found" });

    // owner user question
    const questions = await Question.find({ user: user._id }).sort({
      createdAt: -1,
    });

    const questionIds = questions.map((q) => q._id);

    // All user question
    const answers = await Answer.find({ question: { $in: questionIds } })
      .populate("user", "username") 
      .populate("question", "title description") 
      .sort({ createdAt: -1 });

    res.json({ user, questions, answers });
  } catch (error) {
    res.status(500).json({ error: "Server error" });
  }
});


// Update User Profile
router.put("/profile/:userId", authMiddleware, async (req, res) => {
  try {
    const { username, email, profilePicture } = req.body;
    const updatedUser = await User.findByIdAndUpdate(
      req.params.userId,
      { username, email, profilePicture },
      { new: true, runValidators: true }
    ).select("-password");

    res.json(updatedUser);
  } catch (error) {
    res.status(500).json({ error: "Server error" });
  }
});

module.exports = router;
