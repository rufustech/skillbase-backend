const Course = require("../models/courseModel");
const User = require("../models/userAuthModel");
const mongoose = require('mongoose');

// Create a new course
exports.createCourse = async (req, res) => {
  try {
    const { title, description } = req.body;

    if (!title || !description) {
      return res.status(400).json({ success: false, message: "Title and Description are required" });
    }

    const newCourse = new Course({
      title,
      description,
    });

    await newCourse.save();
    res.status(201).json({
      success: true,
      data: newCourse,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: "Server error",
    });
  }
};

// Get all courses
exports.getCourses = async (req, res) => {
  try {
    const courses = await Course.find().populate("lessons quizzes studentsEnrolled").lean();
    res.status(200).json({ success: true, data: courses });
  } catch (error) {
    console.error("Error fetching courses:", error);
    res.status(500).json({ success: false, message: "Server error" });
  }
};

// Get course by ID

exports.getCourseById = async (req, res) => {
  const { id } = req.params;
  console.log("Received course ID:", id);

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({ success: false, message: "Invalid course ID" });
  }

  try {
    const course = await Course.findById(id).populate("lessons quizzes studentsEnrolled").lean();
    if (!course) {
      return res.status(404).json({ success: false, message: "Course not found" });
    }
    res.status(200).json({ success: true, data: course });
  } catch (error) {
    console.error("Error fetching course by ID:", error);
    res.status(500).json({ success: false, message: "Server error" });
  }
};


// Update course
exports.updateCourse = async (req, res) => {
  try {
    const { title, description } = req.body;
    const course = await Course.findByIdAndUpdate(
      req.params.id,
      { title, description },
      { new: true }
    );
    if (!course) {
      return res.status(404).json({
        success: false,
        message: "Course not found",
      });
    }
    res.status(200).json({
      success: true,
      data: course,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: "Server error",
    });
  }
};

// Delete course
exports.deleteCourse = async (req, res) => {
  try {
    const course = await Course.findByIdAndDelete(req.params.id);
    if (!course) {
      return res.status(404).json({
        success: false,
        message: "Course not found",
      });
    }
    res.status(200).json({
      success: true,
      message: "Course deleted successfully",
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: "Server error",
    });
  }
};

// Enroll a student in a course
// Enroll a student in a course
exports.enrollStudent = async (req, res) => {
  try {
    const { courseId, studentId } = req.params;

    const course = await Course.findById(courseId);
    const student = await User.findById(studentId);

    if (!course || !student) {
      return res.status(404).json({ success: false, message: "Course or Student not found" });
    }

    // Prevent duplicate enrollment
    if (course.studentsEnrolled.includes(studentId)) {
      return res.status(400).json({ success: false, message: "Student already enrolled" });
    }

    course.studentsEnrolled.push(studentId);
    await course.save();

    res.status(200).json({ success: true, message: "Student enrolled successfully" });
  } catch (error) {
    console.error("Error enrolling student:", error);
    res.status(500).json({ success: false, message: "Server error" });
  }
};
