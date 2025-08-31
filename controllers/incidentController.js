// controllers/incidentController.js
const Incident = require("../models/incidentModel");
const multer = require("multer");
const path = require("path");

// Configure multer for file upload
const storage = multer.diskStorage({
  destination: "./uploads/incidents",
  filename: function (req, file, cb) {
    cb(null, "incident-" + Date.now() + path.extname(file.originalname));
  },
});

const upload = multer({
  storage: storage,
  limits: { fileSize: 5000000 }, // 5MB limit
}).array("photos", 5); // Max 5 photos

// Create new incident report
exports.createIncident = async (req, res) => {
  try {
    // Handle file upload
    upload(req, res, async function (err) {
      if (err) {
        return res.status(400).json({
          success: false,
          message: err.message,
        });
      }

      const {
        reporterName,
        date,
        time,
        location,
        incidentType,
        severity,
        description,
      } = req.body;

      // Log the received data
      console.log("Received incident data:", req.body);

      // Validate required fields
      if (
        !reporterName ||
        !date ||
        !time ||
        !location ||
        !incidentType ||
        !description
      ) {
        return res.status(400).json({
          success: false,
          message: "All fields are required",
        });
      }

      // Create incident document
      const incident = new Incident({
        reporterName,
        date: new Date(date),
        time,
        location,
        incidentType,
        severity: severity || "low",
        description,
        reportedBy: req.user._id,
        photos: req.files ? req.files.map((file) => file.path) : [],
      });

      await incident.save();

      res.status(201).json({
        success: true,
        data: incident,
      });
    });
  } catch (error) {
    console.error("Create incident error:", error);
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// Get all incidents
exports.getIncidents = async (req, res) => {
  try {
    const incidents = await Incident.find()
      .populate("reportedBy", "name email")
      .sort("-createdAt");

    res.json({
      success: true,
      count: incidents.length,
      data: incidents,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// Get single incident
exports.getIncident = async (req, res) => {
  try {
    const incident = await Incident.findById(req.params.id).populate(
      "reportedBy",
      "name email"
    );

    if (!incident) {
      return res.status(404).json({
        success: false,
        message: "Incident not found",
      });
    }

    res.json({
      success: true,
      data: incident,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// Update incident
exports.updateIncident = async (req, res) => {
  try {
    const incident = await Incident.findByIdAndUpdate(
      req.params.id,
      { ...req.body, updatedAt: Date.now() },
      { new: true, runValidators: true }
    );

    if (!incident) {
      return res.status(404).json({
        success: false,
        message: "Incident not found",
      });
    }

    res.json({
      success: true,
      data: incident,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// Delete incident
exports.deleteIncident = async (req, res) => {
  try {
    const incident = await Incident.findByIdAndDelete(req.params.id);

    if (!incident) {
      return res.status(404).json({
        success: false,
        message: "Incident not found",
      });
    }

    res.json({
      success: true,
      message: "Incident deleted successfully",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
