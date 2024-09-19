const { Router } = require("express");
const { getUsers, register, login, protected, logout } = require("../controllers/auth");
const { registerValidation, loginValidation } = require("../validators/auth");
const { validationMiddleware } = require("../middlewares/validations-middleware");
const { userAuth } = require("../middlewares/passport-middleware");
const router = Router();

router.post("/register", registerValidation, validationMiddleware, register);
router.post("/login", loginValidation, validationMiddleware, login);
router.post("/logout", logout);

module.exports = router;
