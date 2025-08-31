// models/incidentModel.js
const mongoose = require('mongoose');

const incidentSchema = new mongoose.Schema({
  reporterName: {
    type: String,
    required: true
  },
  date: {
    type: Date,
    required: true
  },
  time: {
    type: String,
    required: true
  },
  location: {
    type: String,
    required: true
  },
  incidentType: {
    type: String,
    enum: ['nearMiss', 'firstAid', 'injury', 'property', 'environmental'],
    required: true
  },
  severity: {
    type: String,
    enum: ['low', 'medium', 'high'],
    default: 'low'
  },
  description: {
    type: String,
    required: true
  },
  photos: [{
    type: String
  }],
  reportedBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
}, {
  timestamps: true
});

module.exports = mongoose.model('Incident', incidentSchema);
