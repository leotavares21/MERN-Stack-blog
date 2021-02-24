const { Router } = require("express");

const router = Router();
const auth = require("../middlewares/auth");

const {
  createComment,
  replyComment,
  getCommentByPostId,
  deleteComment,
  editComment,
  deleteReply,
} = require("../controllers/comment_controller");

router.get("/api/comment/:id", getCommentByPostId);

// user
router.post("/api/comment", auth, createComment);
router.put("/api/comment/reply", auth, replyComment);
router.put("/api/comment/edit", auth, editComment);
router.delete("/api/delete/comment/:id", auth, deleteComment);
router.delete("/api/delete/comment/:id/:replyId", auth, deleteReply);

module.exports = router;
