const express = require("express");
const mongoose = require("mongoose");
require("dotenv").config();
const { Certificate } = require("./models/certificateModel");
const { Course } = require("./models/courseModel");
const app = express();

// Middleware for parsing JSON
app.use(express.json());

// Connect to MongoDB
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("Connected to MongoDB"))
  .catch((err) => console.error("MongoDB connection error:", err));

// Using actual IDs from your dataset
const sampleData = {
  courseId: "6754dc0820cc0bed32e1ccc4", // Your mining safety course ID
  quizId: "67e8deed5ad6384d191cf408",   // Your quiz ID
  userId: "689ae7b0b52afaf5d5bf8230",           // Replace with actual user ID
};

const addCertificate = async () => {
  const certificate = {
    student: sampleData.userId,
    course: sampleData.courseId,
    quiz: sampleData.quizId,
    score: 95, // Example score
    certificateId: `CERT-MINING-${Date.now()}-${sampleData.userId.substr(-4)}`,
    completionDate: new Date(),
    expiresAt: new Date(Date.now() + 180 * 24 * 60 * 60 * 1000), // 180 days validity
  };

  try {
    // Create the certificate
    const createdCertificate = await Certificate.create(certificate);
    console.log("Certificate created:", createdCertificate);

    // Update course completion status
    await Course.findByIdAndUpdate(
      sampleData.courseId,
      {
        $set: {
          'studentsEnrolled.$[elem].status': 'completed'
        }
      },
      {
        arrayFilters: [{ 'elem.student': sampleData.userId }],
        new: true
      }
    );

    console.log("Course completion status updated");
    process.exit(0);
  } catch (err) {
    console.error("Error creating certificate:", err);
    process.exit(1);
  }
};

// Execute the seed function
addCertificate();
