const express = require("express");
const mongoose = require("mongoose");
require("dotenv").config();
const Quiz = require("./models/quizModel"); // Adjust the path to your model
const Course = require("./models/courseModel"); // Adjust the path to your model
const app = express();
require("dotenv").config();

// Middleware for parsing JSON
app.use(express.json());

// Connect to MongoDB`
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("Connected to MongoDB"))
  .catch((err) => console.error("MongoDB connection error:", err));

// const Quiz = require("./models/courseModel");
const courseId = "64a7b1234abcd12345ef6789"; // Replace this with a valid course ID

const addQuiz = async () => {
  const quizzes = [
    {
      title: "Safety Measures in Mining",
      questions: [
        {
          question: "What is the primary protective gear for miners?",
          options: ["Helmet", "Gloves", "Boots", "Goggles"],
          correctAnswer: "Helmet",
        },
        {
          question: "How often should safety drills be conducted?",
          options: ["Daily", "Weekly", "Monthly", "Yearly"],
          correctAnswer: "Weekly",
        },
      ],
      course: courseId,
    },
    {
      title: "First Aid Basics for Miners",
      questions: [
        {
          question: "What is the first step in administering first aid?",
          options: [
            "Call for help",
            "Assess the scene",
            "Perform CPR",
            "Bandage wounds",
          ],
          correctAnswer: "Assess the scene",
        },
        {
          question: "What should you use to stop severe bleeding?",
          options: ["Cloth", "Tourniquet", "Ice pack", "Bandage"],
          correctAnswer: "Tourniquet",
        },
      ],
      course: courseId,
    },
    {
      title: "Fire Safety in Mining Sites",
      questions: [
        {
          question:
            "What type of fire extinguisher is used for electrical fires?",
          options: ["Water", "Foam", "CO2", "Powder"],
          correctAnswer: "CO2",
        },
        {
          question: "What is the evacuation protocol during a fire?",
          options: [
            "Run to the exit",
            "Follow the fire escape plan",
            "Stay in your position",
            "Call 911",
          ],
          correctAnswer: "Follow the fire escape plan",
        },
      ],
      course: courseId,
    },
    // Add more quizzes as needed
  ];
  try {
    const result = await Quiz.create(quizzes);
    console.log("products added", result);
  } catch (err) {
    console.error("Error adding products:", err);
  }
};

// Execute the seed function
addQuiz();
