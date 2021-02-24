const { Router } = require("express");
const router = Router();

const {
  register,
  authenticate,
  forgotPassword,
  resetPassword,
} = require("../controllers/auth_controller");

router.post("/api/register", register);
router.post("/api/authenticate", authenticate);
router.post("/api/forgot_password", forgotPassword);
router.post("/api/forgot_password/:token", resetPassword);

module.exports = router;
