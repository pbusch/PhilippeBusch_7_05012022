const express = require("express");
const router = express.Router();
const auth = require("../middleware/authCheck");
const userCtrl = require("../controllers/user");
const userCheck = require("../middleware/userCheck");
const pwCheck = require("../middleware/pwCheck");

router.put("/:id", auth, userCheck, pwCheck, userCtrl.modUser);
router.get("/", auth, userCtrl.listUsers);
router.get("/:id", auth, userCtrl.userInfo);
router.delete("/:id", auth, userCtrl.delUser);

module.exports = router;
