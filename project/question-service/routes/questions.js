const express = require("express");
const router = express.Router();

const questionController = require("../controllers/questionController");
const middlewareController = require("../controllers/middlewareController");

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

router.get("/category/:category", questionController.getQuestionByCategory);

module.exports = router;
