//Using this to populate data to our DB for endpoint testing
const express = require("express");
const mongoose = require("mongoose");
require("dotenv").config();

const app = express();

// Middleware for parsing JSON
app.use(express.json());

// Connect to MongoDB
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("Connected to MongoDB"))
  .catch((err) => console.error("MongoDB connection error:", err));

const Courses = require("./models/courseModel");

const addCourses = async () => {
  const courses = [
    {
      title: 'Introduction to JavaScript',
      description: 'Learn the fundamentals of JavaScript, including variables, loops, and functions. Perfect for beginners who want to start their programming journey.',
    },
    {
      title: 'Advanced JavaScript Concepts',
      description: 'Dive deeper into JavaScript with advanced topics like closures, promises, async/await, and modules. Ideal for developers who want to level up their skills.',
    },
    {
      title: 'Web Development with React',
      description: 'Learn how to build modern, dynamic web applications using React. Explore components, hooks, state management, and routing in this comprehensive course.',
    },
    {
      title: 'Python for Beginners',
      description: 'Start your programming career by learning Python. This course covers everything from basic syntax to working with libraries and creating your first Python projects.',
    },
    {
      title: 'Data Structures and Algorithms in Python',
      description: 'Master data structures and algorithms in Python. Learn about lists, stacks, queues, trees, and algorithms like sorting, searching, and dynamic programming.',
    },
    {
      title: 'Introduction to Machine Learning',
      description: 'Understand the basics of machine learning, including supervised and unsupervised learning, regression, classification, and data preprocessing.',
    },
    {
      title: 'Introduction to HTML & CSS',
      description: 'Learn how to create and style web pages using HTML and CSS. This course covers the basics of web development and is great for beginners.',
    },
    {
      title: 'Building APIs with Node.js and Express',
      description: 'Learn how to build RESTful APIs using Node.js and Express. Topics include routing, middleware, request handling, and integrating with databases.',
    },
    {
      title: 'Digital Marketing 101',
      description: 'Learn the fundamentals of digital marketing, including SEO, SEM, content marketing, social media strategies, and analytics.',
    },
    {
      title: 'Introduction to Cloud Computing with AWS',
      description: 'Explore cloud computing and Amazon Web Services (AWS). Learn how to deploy applications, manage cloud infrastructure, and leverage cloud storage and compute services.',
    },
  ];
  

  try {
    const result = await Courses.create(courses);
    console.log("products added", result);
  } catch (err) {
    console.error("Error adding products:", err);
  }
};

addCourses();
