const express = require("express");
const mongoose = require("mongoose");
require("dotenv").config();
const Lesson = require("./models/lessonModel"); // Adjust the path to your model
const Course = require("./models/courseModel"); // Adjust the path to your model
const app = express();


// Middleware for parsing JSON
app.use(express.json());

// Connect to MongoDB`
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("Connected to MongoDB"))
  .catch((err) => console.error("MongoDB connection error:", err));

const courseId = "675549660ea354b2069160b6"; // Replace this with a valid course ID

const addLesson = async () => {
  const lessons = [
    {
      title: "Emergency Response Procedures",
      content: "\n        ### Emergency Response Procedures in Mining\n\n        Mining emergencies can happen unexpectedly. A well-prepared response plan is critical for saving lives. Follow these steps when responding to emergencies:\n\n        1. **Alerting the Authorities**: Immediately contact emergency services and report the incident.\n        2. **Evacuation Plan**: Ensure everyone is evacuated from dangerous zones. Follow the designated escape routes.\n        3. **First Aid**: Administer basic first aid to injured workers until professional medical teams arrive.\n        4. **Communication**: Maintain communication with emergency teams and other workers to ensure everyone’s safety.\n\n        Always stay calm and use the right protective gear when responding to emergencies to minimize the risk of injury or fatalities.\n      ",
      course: courseId,
    }
  ];

  try {
    // Add lessons to the Lesson collection
    const createdLessons = await Lesson.create(lessons);
    console.log("Lessons added:", createdLessons);

    // Extract lesson IDs
    const lessonIds = createdLessons.map((lesson) => lesson._id);

    // Update the Course document's lessons array
    await Course.findByIdAndUpdate(
      courseId,
      { $push: { lessons: { $each: lessonIds } } },
      { new: true }
    );

    console.log("Lessons added to the course successfully.");
  } catch (err) {
    console.error("Error adding lesson or updating course:", err);
  }
};


// Execute the seed function
addLesson()
