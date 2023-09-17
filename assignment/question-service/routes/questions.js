const express = require("express");
const router = express.Router();
const Question = require("../models/question");

// READ ALL
router.get("/", async (req, res) => {
  try {
    const questions = await Question.find();
    res.status(200).json(questions);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// READ ONE
router.get("/:id", getQuestion, (req, res) => {
  res.json(res.question);
});

// CREATE ONE
router.post("/", async (req, res) => {
  const question = new Question({
    qid: req.body.qid,
    title: req.body.title,
    description: req.body.description,
    category: req.body.category,
    complexity: req.body.complexity,
  });

  try {
    const newQuestion = await question.save();
    res.status(201).json(newQuestion);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// UPDATE ONE
router.patch("/:id", getQuestion, async (req, res) => {
  if (req.body.qid != null) {
    res.question.qid = req.body.qid;
  }
  if (req.body.title != null) {
    res.question.title = req.body.title;
  }
  if (req.body.description != null) {
    res.question.description = req.body.description;
  }
  if (req.body.category != null) {
    res.question.category = req.body.category;
  }
  if (req.body.complexity != null) {
    res.question.complexity = req.body.complexity;
  }
  try {
    const updatedQuestion = await res.question.save();
    res.json(updatedQuestion);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// DELETE ONE
router.delete("/:id", getQuestion, async (req, res) => {
  try {
    await res.question.deleteOne();
    res.json({ message: "Deleted question" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

async function getQuestion(req, res, next) {
  let question;
  try {
    question = await Question.findById(req.params.id);
    if (question == null) {
      return res.status(404).json({ message: "Cannot find question" });
    }
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }

  res.question = question;
  next();
}

module.exports = router;
