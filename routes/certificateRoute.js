const express = require("express");
const router = express.Router();
const certificateController = require("../controllers/certificateController");
const { protect } = require("../middleware/authMiddleware"); // Import the protect function specifically

// Get user's certificates - Protected route
router.get(
  "/user-certificates",
  protect,
  certificateController.getUserCertificates
);

module.exports = router;
