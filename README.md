# 🚀 Blog Backend API (Node.js + Express)

This is the backend API for a blog management system, built with **Node.js**, **Express**, and **MongoDB**. It features full CRUD functionality for blog posts, user authentication using JWT, and robust middleware for logging and error handling.

---

## 🧰 Technologies Used

- 🟢 **Node.js**
- ⚙️ **Express.js**
- 🍃 **MongoDB**
- 🧠 **Mongoose**
- 🔐 **JWT Authentication**
- 🧂 **bcryptjs**
- ☁️ **dotenv**

---

## 📁 Folder Structure

blog_backend/
├── controllers/
├── middleware/
├── models/
├── routes/
├── server.js


## 🌐 RESTful API Endpoints

| Method | Endpoint           | Description              | Auth Required |
|--------|--------------------|--------------------------|---------------|
| GET    | `/blog/blogs`       | Get all blogs            | ❌            |
| GET    | `/blog/blogs/:id`   | Get single blog          | ✅            |
| POST   | `/blog/blogs`       | Create blog              | ✅            |
| PUT    | `/blog/blogs/:id`   | Update blog              | ✅            |
| DELETE | `/blog/blogs/:id`   | Delete blog              | ✅            |

---

## Setup Instructions for Local Development
✅ Prerequisites:
Make sure the following are installed:

Node.js (v14 or higher) – Download Node.js

MongoDB (local or use MongoDB Atlas) – Install MongoDB

npm or yarn (Comes with Node.js)


For Backend (Node + Express)
cd backend
npm run start

## 🔐 JWT Authentication Middleware

```js
const jwt = require("jsonwebtoken");

module.exports = function (req, res, next) {
  const token = req.header("Authorization")?.split(" ")[1];
  if (!token) return res.status(401).json({ message: "Access denied" });

  try {
    const verified = jwt.verify(token, process.env.JWT_SECRET);
    req.user = verified;
    next();
  } catch (err) {
    res.status(400).json({ message: "Invalid token" });
  }
};



