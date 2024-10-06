// /server.js
const express = require("express");
const bodyParser = require("body-parser");
const connectDB = require("./config/db");
const quizRoutes = require("./routes/quizRoutes");
const questionRoutes = require("./routes/questionRoutes");

const app = express();
const PORT = process.env.PORT || 5000;
// Kết nối MongoDB
connectDB();

// Middleware
app.use(bodyParser.json());

// Routes
app.use("/quizzes", quizRoutes);
app.use("/questions", questionRoutes);

const Question = require('./models/questionModel'); // Điều chỉnh đường dẫn nếu cần



app.listen(PORT, () => {
  console.log(`App listening at http://localhost:${PORT}`);
});
