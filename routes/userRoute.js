const express = require("express");
const {
  getAllUsers,
  createUser,
  getUserById,
  updateUser,
  deleteUser,
} = require("../controllers/userController");

//If else for guest and authenticated users
const { protect } = require("../middleware/authMiddleware");

const router = express.Router();

// Routes
router.get("/", getAllUsers);
router.post("/", createUser);
router.get("/:id", protect, getUserById);
router.put("/:id", protect, updateUser);
router.delete("/:id", protect, deleteUser);

module.exports = router;
