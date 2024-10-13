// /controllers/questionController.js
const Question = require("../models/questionModel");
const Quiz = require("../models/quizModel");

exports.createNewQuestionUI = (req, res) => {
  res.render("newQuestion");
};

exports.getAllQuestions = async (req, res) => {
  console.log("before getAllQuestions");
  try {
    console.log("Before database call");
    const questions = await Question.find();
    // console.log({ questions });

    // Chuyển đổi đối tượng để chỉ giữ lại các thuộc tính cần thiết
    const sanitizedQuestions = questions.map((question) => ({
      id: question._id,
      text: question.text,
      options: question.options,
      keywords: question.keywords,
      correctAnswerIndex: question.correctAnswerIndex,
    }));

    res.render("questions", { questions: sanitizedQuestions });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.createQuestion = async (req, res) => {
  const question = new Question({
    text: req.body.text,
    options: req.body.options,
    keywords: req.body.keywords,
    correctAnswerIndex: req.body.correctAnswerIndex,
  });
  try {
    const newQuestion = await question.save();
    const questions = await Question.find();
    const sanitizedQuestions = questions.map((question) => ({
      id: question._id,
      text: question.text,
      options: question.options,
      keywords: question.keywords,
      correctAnswerIndex: question.correctAnswerIndex,
    }));

    res.render("questions", {
      message: "Quiz created successfully!",
      questions: sanitizedQuestions,
    });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};
// [GET /questions]
// PUT: Cập nhật câu hỏi
// exports.updateQuestion = async (req, res) => {
//   const { questionId } = req.params;
//   const updates = req.body;

//   try {
//     const updatedQuestion = await Question.findByIdAndUpdate(
//       questionId,
//       updates,
//       { new: true }
//     );
//     if (!updatedQuestion)
//       return res.status(404).json({ message: "Question not found" });
//     res.json(updatedQuestion);
//   } catch (err) {
//     res.status(500).json({ message: err.message });
//   }
// };
exports.getQuestionById = async (req, res) => {
  const { questionId } = req.params;
  try {
      const question = await Question.findById(questionId);
      if (!question) return res.status(404).json({ message: 'Question not found' });

      // Sao chép dữ liệu question sang đối tượng mới
      const questionData = {
          _id: question._id,
          text: question.text,
          options: question.options.join(', '), // Chuyển thành chuỗi
          correctAnswerIndex: question.correctAnswerIndex
      };

      res.render('updateQuestion', { questionData });
  } catch (err) {
      res.status(500).json({ message: err.message });
  }
};


exports.updateQuestion = async (req, res) => {
  const { questionId } = req.params;
  const { text, options, correctAnswerIndex } = req.body;
   console.log("this id we use: "+questionId);
  try {
      const question = await Question.findByIdAndUpdate(
          questionId,
          { text, options, correctAnswerIndex },
      { new: true }  
      );

      if (!question) return res.status(404).json({ message: 'Question not found' });

      res.json({ message: 'Question updated successfully', question });
  } catch (err) {
      res.status(500).json({ message: err.message });
  }
};

// DELETE: Xóa câu hỏi

exports.deleteQuestion = async (req, res,next) => {
  const { id } = req.params;
  console.log("Deleting question with ID:", id); // Kiểm tra ID nhận từ client
  try {
    const deletedQuestion = await Question.findByIdAndDelete(id);
    if (!deletedQuestion) {
      return res.status(404).json({ message: "Question not found" });
    }
    res.status(204).send(); // Trả về mã 204 (không có nội dung)
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};


// /controllers/questionController.js
exports.createMultipleQuestions = async (req, res) => {
  const questions = req.body; // Mảng các câu hỏi

  try {
    const newQuestions = await Question.insertMany(questions); // Sử dụng insertMany để tạo nhiều câu hỏi
    res.status(201).json(newQuestions);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};
exports.createQuestionForQuiz = async (req, res) => {
  const { quizId } = req.params;
  const questionData = {
    text: req.body.text,
    options: req.body.options,
    keywords: req.body.keywords,
    correctAnswerIndex: req.body.correctAnswerIndex,
  };

  try {
    const question = new Question(questionData);
    const newQuestion = await question.save();

    await Quiz.findByIdAndUpdate(quizId, {
      $push: { questions: newQuestion._id },
    });

    res.status(201).json(newQuestion);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

exports.createMultipleQuestionsForQuiz = async (req, res) => {
  const { quizId } = req.params;
  const questionsData = req.body; // Mảng các câu hỏi từ yêu cầu

  try {
    mutipleMongooseToObject;
    // Kiểm tra xem quizId có tồn tại hay không
    const quiz = await Quiz.findById(quizId);
    if (!quiz) {
      return res.status(404).json({ message: "Quiz not found" });
    }

    // Tạo nhiều câu hỏi và lưu vào cơ sở dữ liệu
    const questions = await Question.insertMany(questionsData);

    // Cập nhật quiz để thêm các câu hỏi mới
    await Quiz.findByIdAndUpdate(
      quizId,
      { $push: { questions: { $each: questions.map((q) => q._id) } } },
      { new: true } // Tùy chọn để trả về quiz đã cập nhật
    );

    res.status(201).json(questions); // Trả về danh sách câu hỏi đã được tạo
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};
