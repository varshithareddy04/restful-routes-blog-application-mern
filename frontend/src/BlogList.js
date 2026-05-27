import React, { useEffect, useState } from "react";

import axios from "axios";

function BlogList() {

  const [blogs, setBlogs] = useState([]);

  const [editingId, setEditingId] = useState(null);

  const [updatedBlog, setUpdatedBlog] = useState({
    title: "",
    author: "",
    content: "",
  });

  // Fetch Blogs
  const fetchBlogs = async () => {

    try {

      const res = await axios.get(
        "http://localhost:5000/api/blogs"
      );

      setBlogs(res.data);

    } catch (err) {

      console.log(err);

    }

  };

  // Delete Blog
  const deleteBlog = async (id) => {

    try {

      await axios.delete(
        `http://localhost:5000/api/blogs/${id}`
      );

      alert("Blog Deleted");

      fetchBlogs();

    } catch (err) {

      console.log(err);

    }

  };

  // Edit Blog
  const editBlog = (blog) => {

    setEditingId(blog._id);

    setUpdatedBlog({
      title: blog.title,
      author: blog.author,
      content: blog.content,
    });

  };

  // Update Blog
  const updateBlog = async (id) => {

    try {

      await axios.put(
        `http://localhost:5000/api/blogs/${id}`,
        updatedBlog
      );

      alert("Blog Updated Successfully");

      setEditingId(null);

      fetchBlogs();

    } catch (err) {

      console.log(err);

    }

  };

  useEffect(() => {

    fetchBlogs();

  }, []);

  return (

    <div className="blog-list">

      {blogs.map((blog) => (

        <div className="card" key={blog._id}>

          {editingId === blog._id ? (

            <>

              <input
                type="text"
                value={updatedBlog.title}
                onChange={(e) =>
                  setUpdatedBlog({
                    ...updatedBlog,
                    title: e.target.value,
                  })
                }
              />

              <input
                type="text"
                value={updatedBlog.author}
                onChange={(e) =>
                  setUpdatedBlog({
                    ...updatedBlog,
                    author: e.target.value,
                  })
                }
              />

              <textarea
                value={updatedBlog.content}
                onChange={(e) =>
                  setUpdatedBlog({
                    ...updatedBlog,
                    content: e.target.value,
                  })
                }
              />

              <button
                onClick={() => updateBlog(blog._id)}
              >
                Update
              </button>

            </>

          ) : (

            <>

              <h2>{blog.title}</h2>

              <h4>{blog.author}</h4>

              <p>{blog.content}</p>

              <button
                onClick={() => editBlog(blog)}
              >
                Edit
              </button>

              <button
                onClick={() => deleteBlog(blog._id)}
              >
                Delete
              </button>

            </>

          )}

        </div>

      ))}

    </div>

  );
}

export default BlogList;