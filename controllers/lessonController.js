const Lesson = require("../models/lessonModel");
const Course = require("../models/courseModel");
const User = require("../models/userAuthModel");

// Create a new lesson
exports.createLesson = async (req, res) => {
  try {
    const { title, content } = req.body;
    const courseId = req.params.courseId;

    const course = await Course.findById(courseId);
    if (!course) {
      return res.status(404).json({
        success: false,
        message: "Course not found",
      });
    }

    const newLesson = new Lesson({
      title,
      content,
      course: courseId,
    });

    await newLesson.save();

    // Add the lesson to the course's lessons
    course.lessons.push(newLesson._id);
    await course.save();

    res.status(201).json({
      success: true,
      data: newLesson,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: "Server error",
    });
  }
};
// Controller function to get lessons by course ID

exports.getLessonsByCourseId = async (req, res) => {
  const { courseId } = req.params;
  console.log("Course ID:", courseId);  // Log the courseId to see if it's correct

  try {
    const course = await Course.findById(courseId).populate('lessons');
    if (!course) {
      return res.status(404).json({ success: false, message: 'Course not found' });
    }
    console.log("Lessons:", course.lessons);  // Log the populated lessons to verify they're correct
    res.json({ success: true, data: course.lessons });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: 'Server error' });
  }
};



// Get all lessons for a course
exports.getLessons = async (req, res) => {
  try {
    const lessons = await Lesson.find({ course: req.params.courseId }).populate(
      "completedBy"
    );
    res.status(200).json({
      success: true,
      data: lessons,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: "Server error",
    });
  }
};

// Get a single lesson by ID
exports.getLessonById = async (req, res) => {
  try {
    const lesson = await Lesson.findById(req.params.id).populate("completedBy");
    if (!lesson) {
      return res.status(404).json({
        success: false,
        message: "Lesson not found",
      });
    }
    res.status(200).json({
      success: true,
      data: lesson,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: "Server error",
    });
  }
};

// Update a lesson
exports.updateLesson = async (req, res) => {
  try {
    const { title, content } = req.body;
    console.log("Lesson ID", req.params.id);
    
    const lesson = await Lesson.findByIdAndUpdate(
      req.params.id,
      { title, content },
      { new: true }
    );

    if (!lesson) {
      return res.status(404).json({
        success: false,
        message: "Lesson not found",
      });
    }

    res.status(200).json({
      success: true,
      data: lesson,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: "Server error",
    });
  }
};

// Get all lessons (not specific to a course)
exports.getAllLessons = async (req, res) => {
  try {
    const lessons = await Lesson.find().populate("completedBy");
    res.status(200).json({
      success: true,
      data: lessons,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: "Server error",
    });
  }
};


// Delete a lesson
exports.deleteLesson = async (req, res) => {
  try {
    const lesson = await Lesson.findByIdAndDelete(req.params.id);
    if (!lesson) {
      return res.status(404).json({
        success: false,
        message: "Lesson not found",
      });
    }

    // Remove the lesson from the course's lessons
    const course = await Course.findById(lesson.course);
    course.lessons = course.lessons.filter(
      (lessonId) => lessonId.toString() !== lesson._id.toString()
    );
    await course.save();

    res.status(200).json({
      success: true,
      message: "Lesson deleted successfully",
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: "Server error",
    });
  }
};

// Mark a lesson as completed by a student
exports.markLessonCompleted = async (req, res) => {
  try {
    const lesson = await Lesson.findById(req.params.lessonId);
    const student = await User.findById(req.params.studentId);

    if (!lesson || !student) {
      return res.status(404).json({
        success: false,
        message: "Lesson or Student not found",
      });
    }

    // Mark the lesson as completed by the student
    lesson.completedBy.push(student._id);
    await lesson.save();

    // Optionally, you can add the lesson to the user's completed lessons list
    student.completedLessons = student.completedLessons || [];
    student.completedLessons.push(lesson._id);
    await student.save();

    res.status(200).json({
      success: true,
      message: "Lesson marked as completed",
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: "Server error",
    });
  }
};
