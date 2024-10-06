// /controllers/quizController.js
const Quiz = require("../models/quizModel");

exports.getAllQuizzes = async (req, res) => {
    try {
        const quizzes = await Quiz.find().populate("questions");
        res.json(quizzes);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};


exports.getQuizById = async (req, res) => {
    const { quizId } = req.params;

    try {
        const quiz = await Quiz.findById(quizId).populate("questions");
        if (!quiz) return res.status(404).json({ message: "Quiz not found" });
        res.json(quiz);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

exports.createQuiz = async (req, res) => {
    const quiz = new Quiz({
        title: req.body.title,
        description: req.body.description,
        questions: req.body.questions,
    });
    try {
        const newQuiz = await quiz.save();
        res.status(201).json(newQuiz);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
};
// PUT: Cập nhật quiz
exports.updateQuiz = async (req, res) => {
  const { quizId } = req.params;
  const updates = req.body;

  try {
      const updatedQuiz = await Quiz.findByIdAndUpdate(quizId, updates, { new: true });
      if (!updatedQuiz) return res.status(404).json({ message: "Quiz not found" });
      res.json(updatedQuiz);
  } catch (err) {
      res.status(500).json({ message: err.message });
  }
};
// DELETE: Xóa quiz
exports.deleteQuiz = async (req, res) => {
  const { quizId } = req.params;

  try {
      const deletedQuiz = await Quiz.findByIdAndDelete(quizId);
      if (!deletedQuiz) return res.status(404).json({ message: "Quiz not found" });
      res.status(204).send(); // Không trả về nội dung
  } catch (err) {
      res.status(500).json({ message: err.message });
  }
};





exports.populateQuestionsWithKeyword = async (req, res) => {
    const { quizId } = req.params;

    try {
        // Tìm quiz theo quizId
        const quiz = await Quiz.findById(quizId).populate("questions");

        // Kiểm tra xem quiz có tồn tại hay không
        if (!quiz) {
            return res.status(404).json({ message: "Quiz not found" });
        }

        // Lọc các câu hỏi chứa từ khóa "capital"
        const filteredQuestions = quiz.questions.filter(question =>
            question.keywords.includes("capital")
        );

        // Trả về quiz cùng với các câu hỏi đã lọc
        res.json({ ...quiz.toObject(), questions: filteredQuestions });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};
