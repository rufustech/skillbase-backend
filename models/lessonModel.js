// Lesson Schema
const mongoose = require('mongoose');

const lessonSchema = new mongoose.Schema({
  title: { type: String, required: true },
  content: { type: String, required: true },
  course: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'Course', 
    required: true 
  },
  completedBy: [
    { type: mongoose.Schema.Types.ObjectId, ref: 'User' }
  ],
  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model('Lesson', lessonSchema);
