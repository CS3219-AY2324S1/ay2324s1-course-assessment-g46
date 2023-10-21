const express = require("express");
const router = express.Router();
const Question = require("../models/question");
const jwt_decode = require("jwt-decode");
const questionController = require("../controllers/questionController");

const clientUrl = process.env.CLIENT_URL || "http://localhost:3000";

const matchingUrl = process.env.MATCHING_URL || "http://localhost:8080";

function createAuthorize(isAdmin) {
  function authorize(req, res, next) {
    if (req.headers.origin != clientUrl) {
      res.status(401).json({ message: "Unallowed origin" });
    }
    if (!req.headers.authorization) {
      res.status(401).json({ message: "No token is present" });
    }
    role = jwt_decode(req.headers.authorization)?.role;
    if (role == "admin" || (role == "authenticated" && !isAdmin)) {
      next();
    } else {
      let errMsg;
      if (isAdmin) {
        errMsg = "No authorization to modify questions";
      } else {
        errMsg = "No authorization to view questions";
      }
      res.status(403).json({ message: errMsg });
    }
  }
  return authorize;
}

// READ ALL
router.get("/", questionController.getAllQuestions);

// READ ONE
router.get("/:id", getQuestion, (req, res) => {
  res.json(res.question);
});

// CREATE ONE
router.post("/", createAuthorize(true), async (req, res) => {
  const question = new Question({
    id: req.body.id,
    title: req.body.title,
    description: req.body.description,
    category: req.body.category,
    complexity: req.body.complexity,
  });

  try {
    const newQuestion = await question.save();
    res.status(201).json(newQuestion);
  } catch (err) {
    console.log(err.message);
    res.status(400).json({ message: err.message });
  }
});

// UPDATE ONE
router.patch("/:id", [createAuthorize(true), getQuestion], async (req, res) => {
  if (req.body.id != null) {
    res.question.id = req.body.id;
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
router.delete(
  "/:id",
  [createAuthorize(true), getQuestion],
  async (req, res) => {
    try {
      await res.question.deleteOne();
      res.json({ message: "Deleted question" });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }
);

// GET QUESTIONS BY COMPLEXITY
router.get("/complexity/:complexity", async (req, res) => {
  try {
    const questions = await Question.find(
      { complexity: req.params.complexity },
      "id"
    );
    res.status(200).json(questions);
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
