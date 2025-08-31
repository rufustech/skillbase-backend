// controllers/certificateController.js
const Certificate = require('../models/certificateModel');
const Course = require('../models/courseModel');
const mongoose = require('mongoose');

exports.createUserCertificate = async (req, res) => {
  try {
    const { courseId, quizId, score } = req.body;
    const userId = req.user._id;

    // Validate inputs
    if (!courseId || !mongoose.Types.ObjectId.isValid(courseId)) {
      return res.status(400).json({
        success: false,
        message: 'Invalid course ID'
      });
    }

    // Check if course exists
    const course = await Course.findById(courseId);
    if (!course) {
      return res.status(404).json({
        succuccess: false,
        message: 'Course not found'
      });
    }

    // Check for existing certificate
    const existingCert = await Certificate.findOne({
      student: userId,
      course: courseId
    });

    if (existingCert) {
      return res.status(400).json({
        success: false,
        message: 'Certificate already exists for this course'
      });
    }

    // Create certificate
    const certificateData = {
      student: userId,
      course: courseId,
      quiz: quizId,
      score,
      certificateId: `CERT-${Date.now()}-${userId.toString().slice(-4)}`,
      completionDate: new Date(),
      expiresAt: new Date(Date.now() + 180 * 24 * 60 * 60 * 1000), // 180 days
    };

    const certificate = await Certificate.create(certificateData);

    // Update course completion status
    await Course.findByIdAndUpdate(
      courseId,
      {
        $set: {
          'studentsEnrolled.$[elem].status': 'completed'
        }
      },
      {
        arrayFilters: [{ 'elem.student': userId }],
        new: true
      }
    );

    // Return with populated course data
    const populatedCertificate = await Certificate.findById(certificate._id)
      .populate('course', 'title')
      .populate('quiz', 'title');

    res.status(201).json({
      success: true,
      data: populatedCertificate
    });

  } catch (error) {
    console.error('Certificate creation error:', error);
    res.status(500).json({
      success: false,
      message: error.message || 'Failed to create certificate'
    });
  }
};

exports.getUserCertificates = async (req, res) => {
  try {
    const certificates = await Certificate.find({ 
      student: req.user._id,
      expiresAt: { $gt: new Date() }
    })
    .populate('course', 'title')
    .populate('quiz', 'title')
    .sort({ issuedAt: -1 });

    res.json({
      success: true,
      data: certificates
    });
  } catch (error) {
    console.error('Get certificates error:', error);
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

exports.deleteUserCertificate = async (req, res) => {
  try {
    const { certificateId } = req.params;
    const userId = req.user._id;

    const certificate = await Certificate.findOneAndDelete({
      certificateId,
      student: userId
    });

    if (!certificate) {
      return res.status(404).json({
        success: false,
        message: 'Certificate not found'
      });
    }

    res.json({
      success: true,
      message: 'Certificate deleted successfully'
    });

  } catch (error) {
    console.error('Delete certificate error:', error);
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};
