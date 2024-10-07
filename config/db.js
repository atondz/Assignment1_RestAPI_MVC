// /config/db.js
const mongoose = require('mongoose');

const connectDB = async () => {
    try {
        await mongoose.connect('mongodb+srv://toanpqqe170045:phamtoan..@cluster0.8t8ld.mongodb.net/SimpleQuiz?retryWrites=true&w=majority&appName=Cluster0', {
           
        });
        
        console.log("MongoDB connected successfully atlas");
    } catch (error) {
        console.error("MongoDB connection failed:", error.message);
        process.exit(1);
    }
};

module.exports = connectDB;
