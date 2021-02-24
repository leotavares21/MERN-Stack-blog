const { Router } = require("express");

const router = Router();
const auth = require("../middlewares/auth");
const upload = require("../middlewares/multer");

const {
  getPosts,
  getPostsRandomly,
  getPostBySlug,
  createPost,
  updatePost,
  deletePost,
  favoritePost,
  getFavoritePosts,
  getPostByCategory,
  getWriterPosts,
  searchPost,
} = require("../controllers/post_controller");

router.get("/api/posts", getPosts);
router.get("/api/random/posts/", getPostsRandomly);
router.get("/api/post/:slug", getPostBySlug);
router.get("/api/favorite/posts", getFavoritePosts);
router.get("/api/category/post/:slug", getPostByCategory);
router.post("/api/search", searchPost);

// writer
router.get("/api/writer/posts", auth, getWriterPosts);

// admin
router.post("/api/new/post", auth, upload, createPost);
router.put("/api/edit/post/:id", auth, upload, updatePost);
router.put("/api/favorite/post/:id", auth, favoritePost);
router.delete("/api/delete/post/:id", auth, deletePost);

module.exports = router;
