const Quiz = require('../models/quizModel'); // Quiz model
const Course = require('../models/courseModel'); // Course model

// @desc Create a new quiz and link it to a course
// @route POST /api/quiz
// @access Public/Protected (adjust according to your app)
exports.createQuiz = async (req, res) => {
  const { title, questions, courseId } = req.body;

  try {
    // Create the quiz
    const newQuiz = await Quiz.create({ title, questions, course: courseId });

    // Associate the quiz with the course
    const course = await Course.findById(courseId);
    if (!course) {
      return res.status(404).json({ message: 'Course not found' });
    }
    course.quizzes.push(newQuiz._id);
    await course.save();

    res.status(201).json(newQuiz);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Failed to create quiz' });
  }
};

// @desc Get a quiz by ID
// @route GET /api/quiz/:id
// @access Public/Protected
exports.getQuizById = async (req, res) => {
  const { id } = req.params;

  try {
    const quiz = await Quiz.findById(id).populate('course', 'title description');
    if (!quiz) {
      return res.status(404).json({ message: 'Quiz not found' });
    }
    res.status(200).json(quiz);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Failed to fetch quiz' });
  }
};

// @desc Update a quiz
// @route PUT /api/quiz/:id
// @access Protected
exports.updateQuiz = async (req, res) => {
  const { id } = req.params;
  const { title, questions } = req.body;

  try {
    const updatedQuiz = await Quiz.findByIdAndUpdate(
      id,
      { title, questions },
      { new: true }
    );
    if (!updatedQuiz) {
      return res.status(404).json({ message: 'Quiz not found' });
    }
    res.status(200).json(updatedQuiz);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Failed to update quiz' });
  }
};

// @desc Delete a quiz and remove it from the course
// @route DELETE /api/quiz/:id
// @access Protected
exports.deleteQuiz = async (req, res) => {
  const { id } = req.params;

  try {
    const quiz = await Quiz.findByIdAndDelete(id);
    if (!quiz) {
      return res.status(404).json({ message: 'Quiz not found' });
    }

    // Remove the quiz from the course's quizzes array
    await Course.findByIdAndUpdate(quiz.course, { $pull: { quizzes: id } });

    res.status(200).json({ message: 'Quiz deleted successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Failed to delete quiz' });
  }
};

// @desc Get all quizzes for a course
// @route GET /api/quiz/course/:courseId
// @access Public/Protected
exports.getQuizzesByCourse = async (req, res) => {
  const { courseId } = req.params;

  try {
    const course = await Course.findById(courseId).populate('quizzes');
    if (!course) {
      return res.status(404).json({ message: 'Course not found' });
    }
    res.status(200).json(course.quizzes);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Failed to fetch quizzes' });
  }
};

