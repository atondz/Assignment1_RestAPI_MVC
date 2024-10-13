// /controllers/quizController.js
const Quiz = require("../models/quizModel");

// GET: Lấy tất cả quiz

exports.createNewQuizzUI = (req, res) => {
  res.render("newQuizzes");
};
exports.UpdateQuizzUI = (req, res) => {
  res.render("updateQuizzes");
};
exports.getAllQuizzes = async (req, res) => {
  console.log("Fetching all quizz..."); // Xem có in ra không
  try {
    console.log("Before database call");
    const quizzes = await Quiz.find().lean();
    res.render("quizzes", { quizzes });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// [GET]
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
//[POST]
exports.createQuiz = async (req, res) => {
  console.log(req.body); // Xem có in ra không
  const quiz = new Quiz({
    title: req.body.title,
    description: req.body.description,
    questions: req.body.questions,
  });

  try {
    const newQuiz = await quiz.save();
    // res.status(201).json(newQuiz);
    const quizzes = await Quiz.find().lean();
    // res.render("quizzes", { quizzes });

    res.render("quizzes", { message: "Quiz created successfully!", quizzes });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};
// PUT: Cập nhật quiz

exports.updateQuiz = async (req, res) => {
  const { quizId } = req.params;  // Lấy quizId từ URL
  const updates = req.body;  // Dữ liệu cập nhật từ client (form)

  console.log("Cập nhật quiz với id: " + quizId);
  
  try {
    const updatedQuiz = await Quiz.findByIdAndUpdate(quizId, updates, {
      new: true,  // Tùy chọn này trả về quiz sau khi đã được cập nhật
    });
    
    if (!updatedQuiz)
      return res.status(404).json({ message: "Quiz not found" });  // Quiz không tồn tại

    res.json(updatedQuiz);  // Trả về quiz đã cập nhật
  } catch (err) {
    res.status(500).json({ message: err.message });  // Xử lý lỗi
  }
};

// DELETE: Xóa quiz
exports.deleteQuiz = async (req, res) => {
  const { quizId } = req.params;

  try {
    const deletedQuiz = await Quiz.findByIdAndDelete(quizId);
    if (!deletedQuiz)
      return res.status(404).json({ message: "Quiz not found" });
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
    const filteredQuestions = quiz.questions.filter((question) =>
      question.keywords.includes("capital")
    );

    // Trả về quiz cùng với các câu hỏi đã lọc
    res.json({ ...quiz.toObject(), questions: filteredQuestions });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
