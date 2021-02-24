const express = require("express");
const cors = require("cors");
const app = express();

const authRoutes = require("./routes/auth");
const userRoutes = require("./routes/users");
const postRoutes = require("./routes/posts");
const commentRoutes = require("./routes/comments");
const categoryRoutes = require("./routes/categories");

// settings
app.set("port", process.env.PORT || 4000);

// middlewares
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// routes
app.use(authRoutes);
app.use(userRoutes);
app.use(postRoutes);
app.use(commentRoutes);
app.use(categoryRoutes);

app.use((err, req, res, next) => {
  if (err) {
    return;
  }
});

module.exports = app;
