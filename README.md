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



For Backend (Node + Express):

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
```
## Sample Test Data:
This test data includes two users and three blog posts. Passwords are bcrypt-hashed versions 
of "password123". 
{ 
  "users": [ 
    { 
      "name": "Alice Johnson", 
      "email": "alice@example.com", 
   "password":"$2a$10$E6u.zF1gCzUOKX6/cv5Y/O1UzpUQOBuMoOgObwYek.DG2FgYZEd5C" 
    }, 
    { 
      "name": "Bob Smith", 
      “email": "bob@example.com", 
    "password":"$2a$10$E6u.zF1gCzUOKX6/cv5Y/O1UzpUQOBuMoOgObwYek.DG2FgYZEd5C" 
    } 
  ], 
 
 
  "blogs": [ 
    { 
      "title": "Introduction to Node.js", 
      "content": " Node.js is an open-source, cross-platform JavaScript runtime environment 
that allows developers to run JavaScript code outside of a web browser. Built on Google 
Chrome's V8 JavaScript engine, Node.js enables high-performance execution of JavaScript 
code on the server side, making it ideal for building scalable and efficient network 
applications. 
      "authorEmail": "alice@example.com", 
      "createdAt": "2025-06-01T10:00:00Z" 
    }, 
    { 
      "title": "Understanding REST APIs", 
      "content": " A REST API (Representational State Transfer Application Programming 
Interface) is a set of rules and conventions for building and interacting with web services. 
REST is an architectural style that uses HTTP to perform CRUD operations (Create, Read, 
Update, Delete) on resources, making it simple and scalable for client-server 
communication.", 
      "authorEmail": "bob@example.com", 
      "createdAt": "2025-06-02T14:00:00Z" 
    }, 
    { 
      "title": "What is MongoDB?", 
      "content": " MongoDB is a popular NoSQL database that stores data in a flexible, JSON-like 
format called BSON (Binary JSON). Unlike traditional relational databases (like MySQL or 
PostgreSQL), MongoDB is document-oriented, meaning data is stored in collections of documents 
instead of tables and rows. 
MongoDB is designed for high performance, high availability, and easy scalability, making it 
ideal for modern applications, especially those involving large volumes of unstructured or 
semi-structured data. 
.", 
      "authorEmail": "alice@example.com", 
      "createdAt": "2025-06-03T09:30:00Z" 
    } 
  ] 
}

## 2. API Usage Guide: 
All requests use base URL: 
http://localhost:5000/api 
 
1. User Authentication: 
POST /auth/register 
Register a new user. 
{ 
"name": "Charlie", 
"email": "charlie@example.com", 
"password": "password123" 
} 

POST /auth/login 
Login to get a JWT token. 
{ 
} 
"email": "charlie@example.com", 
"password": "password123" 

Response: 
{ 
"token": " eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9. 
eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6Ik5pa2hpbCIsImlhdCI6MTUxNjIzOTAyMn0. 
SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c" 
} 


2. Blog Posts: 
All blog routes require a JWT token in the Authorization header as: 
Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9. 
eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6Ik5pa2hpbCIsImlhdCI6MTUxNjIzOTAyMn0. 
SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c


GET /blog/: 
Fetch all blog posts. 
Headers: 
Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9. 
eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6Ik5pa2hpbCIsImlhdCI6MTUxNjIzOTAyMn0. 
SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c


POST /blog/ 
Create a new blog post. 
{ 
} 
"title": "Test Post", 
"content": "This is a sample blog post." 


GET /blog/:id  
Fetch a specific blog post by ID. 


PUT /blog/:id 
Update a blog post (only by the owner). 
{ 
"title": "Updated Title", 
"content": "Updated content here."
} 


DELETE /blog/:id 
Delete a blog post.
