const { Router } = require("express");
const router = Router();
const auth = require("../middlewares/auth");

const {
  createCategory,
  getCategories,
  getCategoryBySlug,
  updateCategory,
  deleteCategory,
} = require("../controllers/category_controller");

router.get("/api/categories", getCategories);
router.get("/api/categories/:slug", getCategoryBySlug);

// admin
router.post("/api/new/category", auth, createCategory);
router.put("/api/edit/category/:id", auth, updateCategory);
router.delete("/api/delete/category/:id", auth, deleteCategory);

module.exports = router;
