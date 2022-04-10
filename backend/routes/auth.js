const express = require("express");
const router = express.Router();
const authCtrl = require("../controllers/auth");
const userCheck = require("../middleware/userCheck");

// routes d'inscription et d'authentification

router.post("/signup", userCheck, authCtrl.signup);
router.post("/login", authCtrl.login);

module.exports = router;
