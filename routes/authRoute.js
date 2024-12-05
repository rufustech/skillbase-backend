// routes/auth.js
const express = require("express");
const {
  registerUser,
  loginUser,
  getCurrentUser,
} = require("../controllers/userAuthController");
const { protect } = require("../middleware/authMiddleware");

const router = express.Router();

// Register User
router.post("/register", registerUser);

// Login User
router.post("/login", loginUser);

// Get Current User (Protected Route)
router.get("/current", getCurrentUser);

module.exports = router;
