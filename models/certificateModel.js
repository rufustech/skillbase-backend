// Certificate Schema
const mongoose = require("mongoose");

const certificateSchema = new mongoose.Schema({
  student: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  }, // The student who earned the certificate
  course: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Course",
    required: true,
  }, // Reference to the course the student completed
  issuedAt: { type: Date, default: Date.now },
  certificateId: {
    type: String,
    unique: true,
    required: true,
  }, // Unique certificate ID
});

module.exports = mongoose.model("Certificate", certificateSchema);
