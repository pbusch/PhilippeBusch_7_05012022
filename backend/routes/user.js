const express = require("express");
const router = express.Router();
const auth = require("../middleware/authCheck");
const isAdmin = require("../middleware/isAdmin");
const isMod = require("../middleware/isMod");
const userCtrl = require("../controllers/user");
const userCheck = require("../middleware/userCheck");
const pwCheck = require("../middleware/pwCheck");

router.get("/", auth, userCtrl.listUsers);
router.get("/:id", auth, userCtrl.userInfo);
router.delete("/:id", auth, userCtrl.delUser);
router.put("/:id", auth, userCheck, pwCheck, userCtrl.modUser);

module.exports = router;
