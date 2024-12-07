const express = require("express");
const {
  createQuiz,
  getQuizById,
  updateQuiz,
  deleteQuiz,
  getQuizzesByCourse,
} = require("../controllers/quizController");

const router = express.Router();

// Create a quiz
router.post("/", createQuiz);

// Get a quiz by ID
router.get("/:id", getQuizById);

// Update a quiz
router.put("/:id", updateQuiz);

// Delete a quiz
router.delete("/:id", deleteQuiz);

// Get all quizzes for a course
router.get("/course/:courseId", getQuizzesByCourse);

module.exports = router;
