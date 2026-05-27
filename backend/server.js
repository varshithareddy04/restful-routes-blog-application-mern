const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();

app.use(cors());
app.use(express.json());

mongoose.connect("mongodb://127.0.0.1:27017/blogDB")
.then(() => console.log("MongoDB Connected"))
.catch((err) => console.log(err));

app.use("/api/blogs", require("./routes/blogRoutes"));

app.listen(5000, () => {
  console.log("Server Running on Port 5000");
});