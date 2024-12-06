const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const morgan = require("morgan");

require("dotenv").config();

// API endpoints
// const productRoute = require("./routes/productRoute");
const userRoute = require("./routes/userRoute");
const authRoute = require("./routes/authRoute");
const courseRoutes = require("./routes/courseRoutes");
const lessonRoutes = require("./routes/lessonRoutes");
// const cartRoute = require("./routes/cartRoute");
// const commentsRoute = require("./routes/commentsRoute");

const app = express();

app.use(express.json());

//Models

//cors
app.use(cors());
app.use(morgan("dev"));

// Connect to MongoDB
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("Connected to MongoDB"))
  .catch((err) => console.error("MongoDB connection error:", err));

// API Routes
// app.use("/api/products", productRoute);
app.use("/api/user", userRoute);
app.use("/api/auth", authRoute);
app.use("/api/courses", courseRoutes);
app.use("/api/lessons", lessonRoutes);

// app.use("/api/comments", commentsRoute);
// app.use("/api/cart", cartRoute);

// Default Route
app.get("/", (req, res) => {
  res.send("Welcome to the Skillbase Server!");
});

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
