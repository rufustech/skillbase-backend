//Using this to populate data to our DB for endpoint testing
const express = require("express");
const mongoose = require("mongoose");
require("dotenv").config();

const app = express();

// Middleware for parsing JSON
app.use(express.json());

// Connect to MongoDB
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("Connected to MongoDB"))
  .catch((err) => console.error("MongoDB connection error:", err));

const Courses = require("./models/courseModel");

const addCourses = async () => {
  const courses = [
    {
      title: "Safety Measures in Mining",
      description: "An introductory course on safety protocols and best practices in mining operations. Learn to protect yourself and others while working in hazardous conditions.",
      lessons: [], // Add lesson IDs here if lessons are pre-seeded
      quizzes: [], // Add quiz IDs here if quizzes are pre-seeded
      studentsEnrolled: [] // Leave empty or add user IDs for enrolled students
    },
    {
      title: "Hazard Identification in Mining",
      description: "Learn how to identify and mitigate potential hazards in the mining environment to ensure safety and compliance.",
      lessons: [],
      quizzes: [],
      studentsEnrolled: []
    },
    {
      title: "Personal Protective Equipment (PPE) in Mining",
      description: "Understand the importance of PPE, proper usage, and maintenance to safeguard health and safety during mining activities.",
      lessons: [],
      quizzes: [],
      studentsEnrolled: []
    },
    {
      title: "Emergency Preparedness in Mining",
      description: "A comprehensive guide to preparing for emergencies, including evacuation protocols and emergency response strategies.",
      lessons: [],
      quizzes: [],
      studentsEnrolled: []
    },
    {
      title: "Environmental Impact and Sustainability",
      description: "Explore the environmental effects of mining and learn sustainable practices to reduce the ecological footprint.",
      lessons: [],
      quizzes: [],
      studentsEnrolled: []
    },
    {
      title: "Electrical Safety in Mining",
      description: "Understand electrical hazards in mining and how to handle them to prevent accidents and injuries.",
      lessons: [],
      quizzes: [],
      studentsEnrolled: []
    },
    {
      title: "Explosive Handling and Storage",
      description: "Learn the proper procedures for handling, storing, and using explosives in mining operations.",
      lessons: [],
      quizzes: [],
      studentsEnrolled: []
    },
    {
      title: "Mine Site Traffic Management",
      description: "Discover strategies for managing vehicle and equipment traffic to minimize accidents on mine sites.",
      lessons: [],
      quizzes: [],
      studentsEnrolled: []
    },
    {
      title: "Underground Mining Safety",
      description: "Focus on safety measures specific to underground mining environments, including ventilation and structural integrity.",
      lessons: [],
      quizzes: [],
      studentsEnrolled: []
    },
    {
      title: "Surface Mining Safety",
      description: "A detailed course on safety protocols for surface mining, including slope stability and equipment operation.",
      lessons: [],
      quizzes: [],
      studentsEnrolled: []
    },
    {
      title: "First Aid and Health in Mining",
      description: "Learn basic first aid techniques and health considerations critical for mining professionals.",
      lessons: [],
      quizzes: [],
      studentsEnrolled: []
    },
    {
      title: "Chemical Safety in Mining",
      description: "Understand how to safely handle and store chemicals used in mining processes to avoid accidents and health hazards.",
      lessons: [],
      quizzes: [],
      studentsEnrolled: []
    }
  ];
  

  try {
    const result = await Courses.create(courses);
    console.log("products added", result);
  } catch (err) {
    console.error("Error adding products:", err);
  }
};

addCourses();
