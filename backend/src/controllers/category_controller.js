const categoryCtrl = {};

const Category = require("../models/Category");
const Post = require("../models/Post");

categoryCtrl.getCategories = async (req, res) => {
  try {
    const categories = await Category.find();
    if (categories) {
      res.status(200).send(categories);
    } else {
      res.status(404).send({ error: "Erro em carregar categorias" });
    }
  } catch (err) {
    res.status(500).send({ error: "Não foi possível carregar categorias" });
  }
};

categoryCtrl.createCategory = async (req, res) => {
  const { name } = req.body;

  if (!name || typeof name === undefined || name === null) {
    res.status(400).send({ error: "Nome inválido" });
  }

  try {
    const newCategory = new Category({ name });
    await newCategory.save();
    res.status(200).send({ success: "Categoria criada com sucesso" });
  } catch (err) {
    res
      .status(500)
      .send({ error: "Não foi possível criar categoria, tente novamente" });
  }
};

categoryCtrl.getCategoryBySlug = async (req, res) => {
  try {
    const category = await Category.findOne({ slug: req.params.slug });
    res.status(200).send(category);
  } catch (err) {
    res.status(404).send({ error: "Não foi possivel carregar categorias" });
  }
};

categoryCtrl.updateCategory = async (req, res) => {
  const { name } = req.body;
  try {
    await Category.findOneAndUpdate({ _id: req.params.id }, { name });
    res.status(200).send({ success: "Categoria editada com sucesso" });
  } catch (err) {
    res.status(500).send({ error: "Não foi possível editar categoria" });
  }
};

categoryCtrl.deleteCategory = async (req, res) => {
  try {
    const post = await Post.findOne({ category: req.params.id });
    if (post) {
      res
        .status(500)
        .send({ error: "Essa categoria contém uma postagem já criada" });
    } else {
      await Category.findOneAndDelete({ _id: req.params.id });
      res.status(200).send({ success: "Categoria deletada com sucesso" });
    }
  } catch (err) {
    res.status(500).send({ error: "Não foi possível deletar categoria" });
  }
};

module.exports = categoryCtrl;
