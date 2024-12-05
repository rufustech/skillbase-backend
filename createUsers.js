const mongoose = require("mongoose");
const User = require("./models/userAuthModel"); // Import the user model
require("dotenv").config();

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("Connected to MongoDB"))
  .catch((err) => console.error("MongoDB connection error:", err));

const createTestUser = async (userData) => {
  try {
    const user = new User(userData);
    await user.save();
    console.log(`${userData.username} created successfully!`);
  } catch (error) {
    console.error("Error creating user:", error.message);
  }
};

const createMultipleUsers = () => {
  const users = [
    {
      username: "rufaro",
      email: "rufaro@skillbase.ca",
      password: "password123",
    },
    {
      username: "ash",
      email: "ash@skillbase.ca",
      password: "password123",
    },
    {
      username: "chai",
      email: "chai@skillbase.ca",
      password: "password123",
    },
    // {
    //   username: "feli123",
    //   email: "feli@goldenbakery.ca",
    //   password: "password123",
    //   name: "Feli",
    //   createdAt: "2024-11-25T00:00:00Z",
    // },
    // {
    //   username: "mark123",
    //   email: "mark@goldenbakery.ca",
    //   password: "password123",
    //   name: "Mark",
    //   createdAt: "2024-11-25T00:00:00Z",
    // },
    // {
    //   username: "gabriel123",
    //   email: "gabriel@goldenbakery.ca",
    //   password: "password123",
    //   name: "Gabriel",
    //   createdAt: "2024-11-25T00:00:00Z",
    // },
    // {
    //   username: "ethan123",
    //   email: "ethan@goldenbakery.ca",
    //   password: "password123",
    //   name: "Ethan",
    //   createdAt: "2024-11-25T00:00:00Z",
    // },
  ];
  users.forEach((user) => createTestUser(user));
};

createMultipleUsers();
