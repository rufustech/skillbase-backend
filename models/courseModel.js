const mongoose = require('mongoose');

const courseSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  lessons: [
    { type: mongoose.Schema.Types.ObjectId, ref: 'Lesson' }
  ],
  quizzes: [
    { type: mongoose.Schema.Types.ObjectId, ref: 'Quiz' }
  ],
  studentsEnrolled: [
    { type: mongoose.Schema.Types.ObjectId, ref: 'User' }
  ],
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model('Course', courseSchema);
