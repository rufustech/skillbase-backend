const Certificate = require("../models/certificateModel");

exports.getUserCertificates = async (req, res) => {
  try {
    const userId = req.user._id; // This will work with your current auth middleware

    const certificates = await Certificate.find({ student: userId })
      .populate("course", "title description")
      .sort({ issuedAt: -1 });

    res.status(200).json({
      success: true,
      data: certificates,
      message: "Certificates retrieved successfully",
    });
  } catch (error) {
    console.error("Error in getUserCertificates:", error);
    res.status(500).json({
      success: false,
      message: "Error fetching certificates",
      error: error.message,
    });
  }
};
