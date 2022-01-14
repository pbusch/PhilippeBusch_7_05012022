const express = require("express");
const router = express.Router();
const authCtrl = require("../controllers/auth");
const userCheck = require("../middleware/userCheck");

router.post("/signup", userCheck, authCtrl.signup);
router.post("/login", authCtrl.login);

module.exports = router;
