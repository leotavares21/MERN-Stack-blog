const { Router } = require("express");
const router = Router();

const auth = require("../middlewares/auth");

const {
  authenticated,
  userEdit,
  addWriter,
  removeWriter,
  getWriters,
} = require("../controllers/user_controller");

router.get("/api/authenticated", auth, authenticated);
router.get("/api/writers", auth, getWriters);
router.post("/api/edit/user", auth, userEdit);
router.put("/api/add/writer", auth, addWriter);
router.put("/api/delete/writer/:id", auth, removeWriter);

module.exports = router;
