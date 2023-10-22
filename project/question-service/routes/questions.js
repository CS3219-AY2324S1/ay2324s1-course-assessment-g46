const express = require("express");
const router = express.Router();
const Question = require("../models/question");
const jwt_decode = require("jwt-decode");

const questionController = require("../controllers/questionController");
const middlewareController = require("../controllers/middlewareController");

const clientUrl = process.env.CLIENT_URL || "http://localhost:3000";
const matchingUrl = process.env.MATCHING_URL || "http://localhost:8080";

router.get(
  "/",
  middlewareController.checkWriteAuthorization(false),
  questionController.getAllQuestions
);

router.get("/:id", questionController.getOneQuestion);

router.post(
  "/",
  middlewareController.checkWriteAuthorization(true),
  questionController.createOneQuestion
);

router.patch(
  "/:id",
  [
    middlewareController.checkWriteAuthorization(true),
    middlewareController.checkQuestion,
  ],
  questionController.updateOneQuestion
);

router.delete(
  "/:id",
  [
    middlewareController.checkWriteAuthorization(true),
    middlewareController.checkQuestion,
  ],
  questionController.deleteOneQuestion
);

router.get(
  "/complexity/:complexity",
  questionController.getQuestionsByComplexity
);

router.get("/category/:category", questionController.getQuestionsByCategory);

module.exports = router;
