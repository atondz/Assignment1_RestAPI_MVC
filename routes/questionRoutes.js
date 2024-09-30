// /routes/questionRoutes.js
const express = require("express");
const router = express.Router();
const questionController = require("../controllers/questionController");

router.get("/", questionController.getAllQuestions);
router.post("/", questionController.createQuestion);
router.post("/multiple", questionController.createMultipleQuestions); 

module.exports = router;
