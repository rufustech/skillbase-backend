// routes/certificateRoute.js
const express = require('express');
const router = express.Router();
const { protect } = require('../middleware/authMiddleware');
const {
  createUserCertificate,
  getUserCertificates,
  deleteUserCertificate
} = require('../controllers/certificateController');

// Certificate routes
router.post('/create', protect, createUserCertificate);
router.get('/user-certificates', protect, getUserCertificates);
router.delete('/:certificateId', protect, deleteUserCertificate);

module.exports = router;


