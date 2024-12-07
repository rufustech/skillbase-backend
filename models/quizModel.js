// Quiz Schema
const mongoose = require("mongoose");

const quizSchema = new mongoose.Schema({
  title: { type: String, required: true },
  questions: [
    {
      question: { type: String, required: true },
      options: [{ type: String, required: true }],
      correctAnswer: { type: String, required: true },
    },
  ],
  course: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Course",
    required: true,
  }, // Reference to the course this quiz belongs to
  completedBy: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
  ], // Users who completed this quiz
  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model("Quiz", quizSchema);
