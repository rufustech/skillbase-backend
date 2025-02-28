const express = require("express");
const mongoose = require("mongoose");
require("dotenv").config();

const Lesson = require('./models/lessonModel'); // Adjust the path to your model
const Course = require('./models/courseModel'); // For reference to course ID

const app = express();

// Middleware for parsing JSON
app.use(express.json());

// Connect to MongoDB
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("Connected to MongoDB"))
  .catch((err) => console.error("MongoDB connection error:", err));

const createLesson = async () => {
  try {
    const courseId = "6754dc0820cc0bed32e1ccc4"; // Replace with a valid Course ID from your database

    const lesson = new Lesson({
      title: "Safety Measures in Mining",
      content: `
### Introduction to Mining Safety

Mining is a critical industry that significantly contributes to economic growth, but it involves high risks due to the nature of its operations. Implementing robust safety measures ensures not only compliance with industry regulations but also the well-being of miners and the sustainability of mining operations.

### Key Safety Protocols

1. **Proper Training:** All personnel must undergo rigorous training programs to understand equipment operation, hazard identification, and emergency response protocols. Regular refresher courses should also be conducted to keep the workforce updated.

2. **Protective Equipment:** Ensuring all miners wear personal protective equipment (PPE) such as helmets, gloves, high-visibility clothing, and respiratory masks minimizes exposure to harmful substances and potential injuries.

3. **Regular Equipment Maintenance:** All machinery and equipment must be regularly inspected and maintained to avoid malfunctions, which could lead to accidents.

### Emergency Preparedness

Comprehensive emergency preparedness plans should be in place, including evacuation drills, readily available first aid kits, and communication systems to alert all personnel in the event of an accident. Collaborative efforts between management and miners are essential to identify and mitigate potential risks proactively.

By integrating these safety measures, the mining industry can protect its workforce and maintain operational efficiency.
      `,
      course: courseId, // Ensure this references a valid course
    });

    const savedLesson = await lesson.save();
    console.log('Lesson saved:', savedLesson);
  } catch (error) {
    console.error('Error creating lesson:', error.message);
  }
};

createLesson();
