const Comment = require("../models/Comment");

const commentCtrl = {};

commentCtrl.createComment = async (req, res) => {
  const { text, postId } = req.body;

  try {
    const comment = {
      postId: postId,
      text: text,
      author: req.userId,
    };
    const newComment = new Comment(comment);

    newComment.save();
    res.status(200).send(newComment);
  } catch (error) {
    res
      .status(400)
      .send({ error: "Erro ao fazer comentário, tente novamente" });
  }
};

commentCtrl.replyComment = async (req, res) => {
  const { text, commentId } = req.body;

  if (text === undefined || text === null || !text) {
    return;
  }

  try {
    const newReply = await Comment.findOneAndUpdate(
      { _id: commentId },
      {
        $push: {
          replies: {
            text: text,
            author: req.userId,
          },
        },
      }
    );

    res.status(200).send(newReply);
  } catch (err) {
    res
      .status(400)
      .send({ error: "Erro ao responder comentário, tente novamente" });
  }
};

commentCtrl.editComment = async (req, res) => {
  const { text, commentId, replyId } = req.body;

  if (text === undefined || text === null || !text) {
    return;
  }

  try {
    if (!replyId) {
      await Comment.findOneAndUpdate({ _id: commentId }, { text });
    } else {
      await Comment.findOneAndUpdate(
        { _id: commentId, "replies._id": replyId },
        {
          $set: {
            "replies.$.text": text,
          },
        }
      );
    }
    res.status(200).send();
  } catch (err) {
    res
      .status(400)
      .send({ error: "Erro ao editar comentário, tente novamente" });
  }
};

commentCtrl.getCommentByPostId = async (req, res) => {
  try {
    const comment = await Comment.find({ postId: req.params.id })
      .populate("author")
      .populate("replies.author")
      .sort({ createdAt: "desc" });

    res.status(200).send(comment);
  } catch (err) {
    res.status(404).send(err);
  }
};

commentCtrl.deleteComment = async (req, res) => {
  try {
    await Comment.findOneAndDelete({ _id: req.params.id });
    res.status(200).send();
  } catch (err) {
    res
      .status(400)
      .send({ error: "Erro ao deletar comentário, tente novamente" });
  }
};

commentCtrl.deleteReply = async (req, res) => {
  try {
    await Comment.findOneAndUpdate(
      { _id: req.params.id },
      {
        $pull: {
          replies: {
            _id: req.params.replyId,
          },
        },
      }
    );
    res.status(200).send();
  } catch (err) {
    res
      .status(400)
      .send({ error: "Erro ao deletar comentário, tente novamente" });
  }
};

module.exports = commentCtrl;
