// models/certificateModel.js
const mongoose = require("mongoose");

const certificateSchema = new mongoose.Schema({
  student: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  course: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Course",
    required: true,
  },
  quiz: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Quiz",
    required: true,
  },
  score: {
    type: Number,
    required: true,
  },
  issuedAt: { 
    type: Date, 
    default: Date.now 
  },
  certificateId: {
    type: String,
    unique: true,
    required: true,
  },
  completionDate: {
    type: Date,
    default: Date.now,
  },
  expiresAt: {
    type: Date,
    required: true
  }
}, {
  timestamps: true
});

const Certificate = mongoose.model("Certificate", certificateSchema);
module.exports = Certificate;  // Changed to direct export
