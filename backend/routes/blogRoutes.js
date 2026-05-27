const express = require("express");

const router = express.Router();

const Blog = require("../models/Blog");


// ============================
// CREATE BLOG
// POST /api/blogs
// ============================

router.post("/", async (req, res) => {

  try {

    const newBlog = new Blog({
      title: req.body.title,
      author: req.body.author,
      content: req.body.content,
    });

    const savedBlog = await newBlog.save();

    res.status(201).json(savedBlog);

  } catch (err) {

    res.status(500).json({
      message: err.message,
    });

  }

});


// ============================
// GET ALL BLOGS
// GET /api/blogs
// ============================

router.get("/", async (req, res) => {

  try {

    const blogs = await Blog.find();

    res.json(blogs);

  } catch (err) {

    res.status(500).json({
      message: err.message,
    });

  }

});


// ============================
// GET SINGLE BLOG
// GET /api/blogs/:id
// ============================

router.get("/:id", async (req, res) => {

  try {

    const blog = await Blog.findById(
      req.params.id
    );

    if (!blog) {

      return res.status(404).json({
        message: "Blog Not Found",
      });

    }

    res.json(blog);

  } catch (err) {

    res.status(500).json({
      message: err.message,
    });

  }

});


// ============================
// UPDATE BLOG
// PUT /api/blogs/:id
// ============================

router.put("/:id", async (req, res) => {

  try {

    const updatedBlog =
      await Blog.findByIdAndUpdate(

        req.params.id,

        {
          title: req.body.title,
          author: req.body.author,
          content: req.body.content,
        },

        { new: true }

      );

    if (!updatedBlog) {

      return res.status(404).json({
        message: "Blog Not Found",
      });

    }

    res.json(updatedBlog);

  } catch (err) {

    res.status(500).json({
      message: err.message,
    });

  }

});


// ============================
// DELETE BLOG
// DELETE /api/blogs/:id
// ============================

router.delete("/:id", async (req, res) => {

  try {

    const deletedBlog =
      await Blog.findByIdAndDelete(
        req.params.id
      );

    if (!deletedBlog) {

      return res.status(404).json({
        message: "Blog Not Found",
      });

    }

    res.json({
      message:
        "Blog Deleted Successfully",
    });

  } catch (err) {

    res.status(500).json({
      message: err.message,
    });

  }

});


module.exports = router;