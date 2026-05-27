import React, { useState } from "react";

import axios from "axios";

function BlogForm() {

  const [blog, setBlog] = useState({
    title: "",
    author: "",
    content: "",
  });

  // Handle Input Change
  const handleChange = (e) => {

    setBlog({
      ...blog,
      [e.target.name]: e.target.value,
    });

  };

  // Submit Form
  const handleSubmit = async (e) => {

    e.preventDefault();

    try {

      await axios.post(
        "http://localhost:5000/api/blogs",
        blog
      );

      alert("Blog Added Successfully");

      setBlog({
        title: "",
        author: "",
        content: "",
      });

      window.location.reload();

    } catch (err) {

      console.log(err);

      alert("Error Adding Blog");

    }

  };

  return (

    <form onSubmit={handleSubmit} className="form">

      <input
        type="text"
        name="title"
        placeholder="Blog Title"
        value={blog.title}
        onChange={handleChange}
        required
      />

      <input
        type="text"
        name="author"
        placeholder="Author Name"
        value={blog.author}
        onChange={handleChange}
        required
      />

      <textarea
        name="content"
        placeholder="Write Blog Content"
        value={blog.content}
        onChange={handleChange}
        required
      />

      <button type="submit">
        Add Blog
      </button>

    </form>

  );
}

export default BlogForm;