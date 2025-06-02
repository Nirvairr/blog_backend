import cloudinary from "../config/cloudinary.js";
import Blog from "../Models/Blogs.js";
import streamifier from "streamifier";

export const addBlog = async (req, res) => {
  try {
    const { title, content, category } = req.body;
    const file = req.file;

    // Basic validation
    if (!title || !content || !category) {
      return res.status(400).json({
        message: "Title, content, and category are required.",
      });
    }

    let imageUrl = "";

    // Upload image if provided
    if (file) {
      const streamUpload = (fileBuffer) => {
        return new Promise((resolve, reject) => {
          const stream = cloudinary.uploader.upload_stream(
            { folder: "blogs" },
            (error, result) => {
              if (result) {
                resolve(result);
              } else {
                reject(error);
              }
            }
          );
          streamifier.createReadStream(fileBuffer).pipe(stream);
        });
      };

      const result = await streamUpload(file.buffer);
      imageUrl = result.secure_url;
    }

    const newBlog = new Blog({
      title,
      content,
      category,
      coverImage: imageUrl,
      author: req.user._id,
    });

    await newBlog.save();

    return res.status(201).json({
      message: "Blog created successfully",
      blog: newBlog,
    });
  } catch (error) {
    console.error("Error creating blog:", error);
    return res.status(500).json({
      message: "Server error",
      error: error.message,
    });
  }
};

export const editBlog = async (req, res) => {
  try {
    const { edittitle, editcontent, editcategory } = req.body;
    const file = req.file;
    console.log(req.body);

    // Basic validation
    if (!edittitle || !editcontent || !editcategory) {
      return res.status(400).json({
        message: "Title, content, and category are required.",
      });
    }

    let imageUrl = "";

    // Upload image if provided
    if (file) {
      const streamUpload = (fileBuffer) => {
        return new Promise((resolve, reject) => {
          const stream = cloudinary.uploader.upload_stream(
            { folder: "blogs" },
            (error, result) => {
              if (result) {
                resolve(result);
              } else {
                reject(error);
              }
            }
          );
          streamifier.createReadStream(fileBuffer).pipe(stream);
        });
      };

      const result = await streamUpload(file.buffer);
      imageUrl = result.secure_url;
    }

    const updatedBlog = await Blog.findByIdAndUpdate(
      req.params.id, // ID of the blog to update
      {
        title: edittitle,
        content: editcontent,
        category: editcategory,
        coverImage: imageUrl,
        author: req.user._id,
      },
      { new: true } // Return the updated document
    );
    await updatedBlog.save();

    return res.status(201).json({
      message: "Blog edited successfully",
      blog: updatedBlog,
    });
  } catch (error) {
    console.error("Error creating blog:", error);
    return res.status(500).json({
      message: "Server error",
      error: error.message,
    });
  }
};
export const fetchBlogs = async (req, res) => {
  try {
    const allBlogs = await Blog.find({});

    if (allBlogs) {
      return res.status(200).json({
        message: "Blog Fetched successfully",
        blog: allBlogs,
      });
    }
  } catch (error) {
    console.error("Error creating blog:", error);
    return res.status(500).json({
      message: "Server error",
      error: error.message,
    });
  }
};
export const deleteBlog = async (req, res) => {
  try {
    const { id } = req.params;
    const blog = await Blog.findByIdAndDelete(id);
    if (!blog) {
      return res.status(404).json({ message: "Blog not found" });
    }
    res.status(200).json({ message: "Blog deleted successfully" });
  } catch (error) {
    console.error("Error creating blog:", error);
    return res.status(500).json({
      message: "Server error",
      error: error.message,
    });
  }
};

export const getblogbyid = async (req, res) => {
  try {
    const { id } = req.params;
    const singleBlog = await Blog.findById(id);
    if (singleBlog) {
      return res.status(200).json({ blog: singleBlog });
    }
  } catch (error) {
    console.error("Error creating blog:", error);
    return res.status(500).json({
      message: "Server error",
      error: error.message,
    });
  }
};
