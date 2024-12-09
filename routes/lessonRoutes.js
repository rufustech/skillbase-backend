const express = require('express');
const router = express.Router();
const lessonController = require('../controllers/lessonController');

// Create a new lesson for a specific course
router.post('/course/:courseId/lessons', lessonController.createLesson);

// Get all lessons for a course
router.get('/course/:courseId', lessonController.getLessons);

// Get a single lesson by ID
router.get('/:id', lessonController.getLessonById);

// Update a lesson
router.put('/:id', lessonController.updateLesson);

// Get all lessons
router.get('/', lessonController.getAllLessons);

router.get('/api/lessons/:courseId',lessonController.getLessonsByCourseId);

// Delete a lesson
router.delete('/:id', lessonController.deleteLesson);

// Mark a lesson as completed by a student
router.post('/:lessonId/complete/:studentId', lessonController.markLessonCompleted);


module.exports = router;
