// routes/incidentRoute.js
const express = require("express");
const router = express.Router();
const { protect } = require("../middleware/authMiddleware");
const {
  createIncident,
  getIncidents,
  getIncident,
  updateIncident,
  deleteIncident,
} = require("../controllers/incidentController");

router.post("/create", protect, createIncident);
router.get("/", protect, getIncidents);
router.get("/:id", protect, getIncident);
router.put("/:id", protect, updateIncident);
router.delete("/:id", protect, deleteIncident);

module.exports = router;
