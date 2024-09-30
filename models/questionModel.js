// /models/questionModel.js
const mongoose = require('mongoose');

const questionSchema = new mongoose.Schema({
    text: { type: String, required: true },
    options: [String],
    keywords: [String],
    correctAnswerIndex: { type: Number, required: true },
});

module.exports = mongoose.model('Question', questionSchema);
