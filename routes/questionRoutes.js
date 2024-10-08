// /routes/questionRoutes.js
const express = require("express");
const router = express.Router();
const questionController = require("../controllers/questionController");

router.get("/", questionController.getAllQuestions);
router.get("/new", questionController.createNewQuestionUI);

router.post("/", questionController.createQuestion);
router.post("/multiple", questionController.createMultipleQuestions); 
router.delete('/:id',  questionController.deleteQuestion);


module.exports = router;
