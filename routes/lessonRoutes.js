const express = require('express');
const router = express.Router();
const lessonController = require('../controllers/lessonController');


router.post('/courses/:courseId', lessonController.createLesson); 
router.get('/courses/:courseId', lessonController.getLessonsByCourseId);  //is working now Yaay
router.get('/:id', lessonController.getLessonById); 
router.put('/:id', lessonController.updateLesson); // Update lesson
router.delete('/lessons/:id', lessonController.deleteLesson); // Delete lesson
router.get('/', lessonController.getAllLessons); // Get all lessons
router.post('/:lessonId/complete/:studentId', lessonController.markLessonCompleted); // Mark completed





module.exports = router;



module.exports = router;
