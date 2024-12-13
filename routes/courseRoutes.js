const express = require("express");
const router = express.Router();
const courseController = require("../controllers/courseController");

const { protect } = require("../middleware/authMiddleware");

// Create a new course
router.post("/", courseController.createCourse);

// Get all courses
router.get("/", courseController.getCourses);

// Get a course by ID
router.get("/:id", courseController.getCourseById);

// Update a course
router.put("/:id", courseController.updateCourse);

// Delete a course
router.delete("/:id", courseController.deleteCourse);

// Enroll a student in a course
router.post("/:courseId/enroll/:studentId", courseController.enrollStudent);

module.exports = router;
