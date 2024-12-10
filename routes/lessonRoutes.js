const express = require('express');
const router = express.Router();
const lessonController = require('../controllers/lessonController');

// Consolidated Lesson Routes
router.post('/courses/:courseId/lessons', lessonController.createLesson); // Create lesson
router.get('/courses/:courseId/lessons', lessonController.getLessonsByCourseId); // Get lessons by course ID
router.get('/lessons/:id', lessonController.getLessonById); // Get lesson by ID
router.put('/lessons/:id', lessonController.updateLesson); // Update lesson
router.delete('/lessons/:id', lessonController.deleteLesson); // Delete lesson
router.get('/lessons', lessonController.getAllLessons); // Get all lessons
router.post('/lessons/:lessonId/complete/:studentId', lessonController.markLessonCompleted); // Mark completed



module.exports = router;
