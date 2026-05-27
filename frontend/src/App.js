import React from "react";

import BlogForm from "./BlogForm";
import BlogList from "./BlogList";

import "./App.css";

function App() {

  return (

    <div className="container">

      <h1>Blog Application</h1>

      <BlogForm />

      <BlogList />

    </div>

  );
}

export default App;