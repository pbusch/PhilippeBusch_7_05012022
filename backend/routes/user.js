const express = require("express");
const router = express.Router();
const auth = require("../middleware/authCheck");
const isAdmin = require("../middleware/isAdmin");
const isMod = require("../middleware/isMod");
const userCtrl = require("../controllers/user");
const userCheck = require("../middleware/userCheck");

router.get("/", auth, userCtrl.listUsers);
router.get("/:id", auth, userCtrl.userInfo);
router.delete("/:id", auth, userCtrl.delUser);
router.put("/:id", auth, userCheck, userCtrl.modUser);

module.exports = router;
