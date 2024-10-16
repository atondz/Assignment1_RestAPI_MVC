// /routes/questionRoutes.js
const express = require("express");
const router = express.Router();
const questionController = require("../controllers/questionController");

router.get("/", questionController.getAllQuestions);
router.get("/new", questionController.createNewQuestionUI);


router.get('/:questionId/update', questionController.getQuestionById);

router.put('/:questionId', questionController.updateQuestion); // Xử lý cập nhật câu hỏi

router.post("/", questionController.createQuestion);
router.post("/multiple", questionController.createMultipleQuestions); 
router.delete('/:id',  questionController.deleteQuestion);


module.exports = router;
