const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const morgan = require("morgan");
const fs = require("fs");
const path = require("path");
require("dotenv").config();
const { initializeCertificateCleanup } = require("./utils/schedulers");

const uploadsDir = path.join(__dirname, "uploads/incidents");
if (!fs.existsSync(uploadsDir)) {
  fs.mkdirSync(uploadsDir, { recursive: true });
}

// Serve uploaded files

const userRoute = require("./routes/userRoute");
const authRoute = require("./routes/authRoute");
const courseRoutes = require("./routes/courseRoutes");
const lessonRoutes = require("./routes/lessonRoutes");
const quizRoute = require("./routes/quizRoute");
const certificateRoutes = require("./routes/certificateRoute");
const incidentRoutes = require("./routes/incidentRoute");

const app = express();

// Middleware
app.use(express.json());
app.use(
  cors({
    origin: [
      "https://safety.co.zw",
      "https://www.safety.co.zw", // Amplify
      "http://localhost:3000",
      "http://127.0.0.1:3000",
      "http://localhost:5173",
      "http://127.0.0.1:5173",
    ],
    methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
    credentials: true,
  })
);
app.use(morgan("dev"));

// Connect to MongoDB
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log("Connected to MongoDB");
    // Initialize scheduler after DB connection
    initializeCertificateCleanup();
  })
  .catch((err) => console.error("MongoDB connection error:", err));

// API Routes
app.use("/api/user", userRoute);
app.use("/api/auth", authRoute);
app.use("/api/courses", courseRoutes);
app.use("/api/lessons", lessonRoutes);
app.use("/api/quiz", quizRoute);
app.use("/api/incidents", incidentRoutes);
app.use("/api/certificates", certificateRoutes);
app.use("/uploads", express.static("uploads"));

// Default Route
app.get("/", (req, res) => {
  res.send("Welcome to the Skillbase Server!");
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res
    .status(err.status || 500)
    .json({ message: err.message || "Internal Server Error" });
});

// Graceful Shutdown
process.on("SIGINT", async () => {
  console.log("Shutting down gracefully...");
  try {
    await mongoose.connection.close();
    console.log("MongoDB connection closed.");
  } catch (err) {
    console.error("Error closing MongoDB connection:", err);
  } finally {
    process.exit(0);
  }
});

// Start Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

module.exports = app;
