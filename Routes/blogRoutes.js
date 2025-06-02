import express from "express";
import {
  addBlog,
  deleteBlog,
  editBlog,
  fetchBlogs,
  getblogbyid,
} from "../Controller/blogController.js";
import { authMiddleware } from "../Middleware/authMiddleware.js";
import upload from "../Middleware/multer.js";

const blogrouter = express.Router();

blogrouter.post("/addblog", authMiddleware, upload.single("image"), addBlog);
blogrouter.post(
  "/editblog/:id",
  authMiddleware,
  upload.single("editimage"),
  editBlog
);
blogrouter.get("/fetchblogs", fetchBlogs);
blogrouter.post("/deleteblog/:id", deleteBlog);
blogrouter.get("/getblog/:id", getblogbyid);

export default blogrouter;
