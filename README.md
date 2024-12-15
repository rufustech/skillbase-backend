# Skillbase Project

Skillbase is a web application designed to streamline course and lesson management, providing an intuitive interface for educators and students alike. The project comprises a Node.js and MongoDB-based backend with a React Vite and Tailwind CSS-powered frontend.

---

## Features

### Backend
- Node.js and Express.js for building APIs.
- MongoDB for database management.
- Fully functional API routes for:
  - User management (`/api/user`)
  - Authentication (`/api/auth`)
  - Products (`/api/products`)
  - Courses (`/api/courses`)
  - Lessons (`/api/lessons`)
  - Quizzes (`/api/quiz`)

### Frontend
- Built with React and Vite for fast development.
- Styled using Tailwind CSS for a modern and responsive UI.

---

## Getting Started

### Backend Setup

1. **Fork the Backend Repository**
   - Go to the [Skillbase Backend Repository](https://github.com/rufustech/skillbase-backend) and click on `Fork` to create your copy of the project.

2. **Clone the Repository**
   ```bash
   git clone https://github.com/<your-username>/skillbase-backend.git
   cd skillbase-backend
   ```

3. **Install Dependencies**
   ```bash
   npm install
   ```

4. **Set Up Environment Variables**
   - Create a `.env` file in the root directory.
   - Add the following variables:
     ```env
     PORT=5000
     MONGO_URI=<your-mongodb-connection-string>
     JWT_SECRET=<your-jwt-secret>
     ```

5. **Start the Backend Server**
   ```bash
   npm start
   ```
   The backend server will start on `http://localhost:5000`.

---

### Frontend Setup

1. **Clone the Frontend Repository**
   ```bash
   git clone https://github.com/<your-username>/skillbase-frontend.git
   cd skillbase-frontend
   ```

2. **Install Dependencies**
   ```bash
   npm install
   ```

3. **Start the Frontend**
   ```bash
   npm run dev
   ```
   The frontend will start on `http://localhost:5173`.

---

## Folder Structure

### Backend
```
skillbase-backend/
├── controllers/
├── models/
├── routes/
├── middleware/
├── .env
├── app.js
└── server.js
```

### Frontend
```
skillbase-frontend/
├── src/
│   ├── components/
│   ├── pages/
│   ├── hooks/
│   ├── App.jsx
│   ├── main.jsx
├── public/
├── .env
├── index.html
└── vite.config.js
```

---

## API Routes
The following are the key API routes for the backend:
- `/api/products`: Handles product-related operations.
- `/api/user`: Manages user-related operations.
- `/api/auth`: Handles authentication-related operations.
- `/api/courses`: Manages course-related operations.
- `/api/lessons`: Manages lesson-related operations.
- `/api/quiz`: Handles quiz-related operations.

---

## Technologies Used

### Backend
- Node.js
- Express.js
- MongoDB

### Frontend
- React
- Vite
- Tailwind CSS

---

## Contributing
1. Fork the repository.
2. Create a new branch for your feature.
3. Commit your changes.
4. Push the branch and create a pull request.

---

## License
This project is licensed under the [MIT License](LICENSE).

---

## Contact
For any inquiries, feel free to contact the project owner via [GitHub Issues](https://github.com/rufustech/skillbase-backend/issues).

