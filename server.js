
// /server.js

const path = require('path');
const express = require("express");
const bodyParser = require("body-parser");
const connectDB = require("./config/db");
const quizRoutes = require("./routes/quizRoutes");
const questionRoutes = require("./routes/questionRoutes");
const exphbs = require("express-handlebars");
const Handlebars = require("handlebars"); // Thêm import từ Handlebars gốc
const Question = require('./models/questionModel'); // Điều chỉnh đường dẫn nếu cần

const app = express();
const PORT = process.env.PORT || 5000;
// Kết nối MongoDB
connectDB();


const runtimeOptions = {
  allowProtoPropertiesByDefault: true,
  allowProtoMethodsByDefault: true
};
app.engine("hbs", exphbs.engine({ 
  extname: ".hbs",
  handlebars: Handlebars.create(runtimeOptions) // Cấu hình Handlebars với runtime options
}));
app.set("view engine", "hbs");
app.set("views", path.join(__dirname, "resources/views"));
console.log("PATH: ", path.join(__dirname, "resources/views"));

app.use(express.static('public'));


// Middleware
app.use(bodyParser.json());

// Middleware để parse JSON
app.use(express.json());
// Middleware để parse URL-encoded data
app.use(express.urlencoded({ extended: true }));
// Routes
app.get('/', (req, res) => {
  res.render('home'); // Render trang home
});
app.use("/quizzes", quizRoutes);
app.use("/questions", questionRoutes);




app.listen(PORT, () => {
  console.log(`App listening at http://localhost:${PORT}`);
});
