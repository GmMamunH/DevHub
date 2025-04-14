const express = require("express");
const Answer = require("../models/Answer");
const authMiddleware = require("../middleware");

const router = express.Router();

// answer question / comment
router.post("/:questionId", authMiddleware, async (req, res) => {
  try {
    const { text } = req.body;
    const newAnswer = new Answer({
      text,
      user: req.user.id,
      question: req.params.questionId,
    });
    await newAnswer.save();
    res.status(201).json(newAnswer);
  } catch (error) {
    res.status(500).json({ error: "Server error" });
  }
});

// gelt all answer
router.get("/:questionId", async (req, res) => {
  try {
    const answers = await Answer.find({
      question: req.params.questionId,
    }).populate("user", "username");
    res.json(answers);
  } catch (error) {
    res.status(500).json({ error: "Server error" });
  }
});

// Upvote
router.put("/:id/upvote", authMiddleware, async (req, res) => {
  try {
    const answer = await Answer.findById(req.params.id);
    if (!answer) return res.status(404).json({ error: "Answer not found" });

    // remove previous vote
    answer.downvotes = answer.downvotes.filter((id) => id.toString() !== req.user.id);
    if (!answer.upvotes.includes(req.user.id)) {
      answer.upvotes.push(req.user.id);
    } else {
      answer.upvotes = answer.upvotes.filter((id) => id.toString() !== req.user.id);
    }

    await answer.save();
    res.json(answer);
  } catch (error) {
    res.status(500).json({ error: "Server error" });
  }
});

// Downvote
router.put("/:id/downvote", authMiddleware, async (req, res) => {
  try {
    const answer = await Answer.findById(req.params.id);
    if (!answer) return res.status(404).json({ error: "Answer not found" });

    // remove previous vote
    answer.upvotes = answer.upvotes.filter((id) => id.toString() !== req.user.id);
    if (!answer.downvotes.includes(req.user.id)) {
      answer.downvotes.push(req.user.id);
    } else {
      answer.downvotes = answer.downvotes.filter((id) => id.toString() !== req.user.id);
    }

    await answer.save();
    res.json(answer);
  } catch (error) {
    res.status(500).json({ error: "Server error" });
  }
});

module.exports = router;
