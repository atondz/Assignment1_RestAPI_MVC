// /routes/quizRoutes.js
const express = require("express");
const router = express.Router();
const quizController = require("../controllers/quizController");
const questionController = require("../controllers/questionController");

router.get("/", quizController.getAllQuizzes);               // Lấy tất cả quizzes
router.get("/:quizId", quizController.getQuizById);         // Lấy quiz theo ID
router.post("/", quizController.createQuiz);                 // Tạo quiz mới
router.put("/:quizId", quizController.updateQuiz);           // Cập nhật quiz theo ID
router.delete("/:quizId", quizController.deleteQuiz);        // Xóa quiz theo ID

router.post("/:quizId/question", questionController.createQuestionForQuiz);
router.post("/:quizId/questions", questionController.createMultipleQuestionsForQuiz);
router.get("/:quizId/populate", quizController.populateQuestionsWithKeyword); // Thêm endpoint mới

module.exports = router;
