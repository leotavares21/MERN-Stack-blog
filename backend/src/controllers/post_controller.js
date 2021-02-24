const postCtrl = {};

const Post = require("../models/Post");
const Comment = require("../models/Comment");
const Category = require("../models/Category");
const cloudinary = require("cloudinary").v2;
const { query } = require("express");

cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.CLOUD_KEY,
  api_secret: process.env.CLOUD_SECRET,
});

postCtrl.getPosts = async (req, res) => {
  try {
    const posts = await Post.find()
      .populate("author category")
      .sort({ createdAt: "desc" });

    if (posts) {
      res.status(200).send(posts);
    } else {
      res.status(404).send({ error: "Postagens não encontradas" });
    }
  } catch (err) {
    res.status(500).send({ error: "Não foi possível carregar postagens" });
  }
};

postCtrl.getPostsRandomly = async (req, res) => {
  try {
    await Post.aggregate([
      {
        $sample: { size: 3 },
      },
    ]).exec((err, result) => {
      if (err) {
        console.log(err);
      } else {
        Post.populate(
          result,
          {
            path: "category author",
            select: "name username slug",
          },
          (err, popRes) => {
            if (err) {
              console.log(err);
            } else {
              res.status(200).send(popRes);
            }
          }
        );
      }
    });
  } catch (err) {
    res.status(500).send({ error: "Não foi possível carregar postagens" });
  }
};

postCtrl.createPost = async (req, res) => {
  const { title, content, category } = req.body;
  const file = req.file;

  try {
    if (!title || typeof title === undefined || title === null) {
      res.status(400).send({ error: "Título inválido" });
    }

    if (!content || typeof content === undefined || content === null) {
      res.status(400).send({ error: "Conteúdo inválido" });
    }

    if (!category || typeof category === undefined || category === null) {
      res.status(400).send({ error: "Categoria inválida" });
    }

    if (!file || typeof file === undefined || file === null) {
      res.status(400).send({ error: "Imagem inválida" });
    }

    const newPost = new Post({
      title,
      content,
      category,
      author: req.userId,
      image: file.filename,
      imageUrl: file.path,
    });
    await newPost.save();
    res.status(200).send({ success: "Postagem criada com sucesso" });
  } catch (err) {
    res
      .status(500)
      .send({ error: "Não foi possivel criar postagem, tente novamente" });
  }
};

postCtrl.getPostBySlug = async (req, res) => {
  try {
    const post = await Post.findOne({ slug: req.params.slug }).populate(
      "author category comments.author comments.replies.author"
    );

    res.status(200).send(post);
  } catch (err) {
    res.status(404).send({ error: "Não foi possível carregar postagens" });
  }
};

postCtrl.updatePost = async (req, res) => {
  const { image, title, content, category } = req.body;
  const file = req.file;

  try {
    if (!title || typeof title === undefined || title === null) {
      res.status(400).send({ error: "Título inválido" });
    }

    if (!content || typeof content === undefined || content === null) {
      res.status(400).send({ error: "Conteúdo inválido" });
    }

    if (!category || typeof category === undefined || category === null) {
      res.status(400).send({ error: "Categoria inválida" });
    }

    if (typeof file === undefined || file === null) {
      res.status(400).send({ error: "Imagem inválida" });
    }

    if (file) {
      await Post.findOneAndUpdate(
        { _id: req.params.id },
        { title, content, category, image: file.filename, imageUrl: file.path }
      );
    } else {
      const currentImg = await Post.findOne({ image: image });

      if (currentImg) {
        await Post.findOneAndUpdate(
          { _id: req.params.id },
          { title, content, category }
        );
      }

      if (!image) {
        await Post.findOneAndUpdate(
          { _id: req.params.id },
          { title, content, category, image: undefined, imageUrl: undefined }
        );
      }
    }
    res.status(200).send({ success: "Postagem editada com sucesso" });
  } catch (err) {
    res.status(500).send({ error: "Não foi possível editar postagem" });
  }
};

postCtrl.deletePost = async (req, res) => {
  try {
    const img = req.query.img.substr(req.query.img.lastIndexOf("/") + 1);
    const queryStr = img.replace(/\.[^/.]+$/, "");

    cloudinary.uploader.destroy(
      `blog-fides/${queryStr}`,
      function (error, result) {
        console.log(result, error);
      }
    );

    await Post.findOneAndDelete({ _id: req.params.id });
    await Comment.deleteMany({ postId: req.params.id });

    res.status(200).send({ success: "Postagem deletada com sucesso" });
  } catch (err) {
    res.status(500).send({ error: "Não foi possível deletar postagem" });
  }
};

postCtrl.favoritePost = async (req, res) => {
  const { favorite } = req.body;
  try {
    const post = await Post.findOneAndUpdate(
      { _id: req.params.id },
      {
        favorite,
      }
    );
    res.status(200).send(post);
  } catch (err) {
    res.status(500).send({ error: "Não foi possível favoritar postagem" });
  }
};

postCtrl.getFavoritePosts = async (req, res) => {
  try {
    const posts = await Post.find({ favorite: true })
      .populate("author category")
      .sort({ createdAt: "desc" });
    res.status(200).send(posts);
  } catch (err) {
    res.status(404).send(err);
  }
};

postCtrl.getPostByCategory = async (req, res) => {
  try {
    const category = await Category.findOne({ slug: req.params.slug });

    if (category) {
      const posts = await Post.find({ category: category._id })
        .populate("author category")
        .sort({ createdAt: "desc" });
      res.status(200).send(posts);
    }
  } catch (err) {
    res.status(404).send(err);
  }
};

postCtrl.getWriterPosts = async (req, res) => {
  try {
    const posts = await Post.find({ author: req.userId })
      .populate("category")
      .sort({ createdAt: "desc" });
    res.status(200).send(posts);
  } catch (err) {
    console.log(err);
  }
};

postCtrl.searchPost = async (req, res) => {
  const searchPattern = new RegExp(req.query.text, "i");

  try {
    const post = await Post.find({
      $or: [
        { content: { $regex: searchPattern } },
        { title: { $regex: searchPattern } },
      ],
    }).populate("author category");
    res.status(200).send(post);
  } catch (err) {
    res.status(404).send(err);
  }
};

module.exports = postCtrl;
