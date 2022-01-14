const express = require("express");
const router = express.Router();
const auth = require("../middleware/authCheck");
const isAdmin = require("../middleware/isAdmin");
const isMod = require("../middleware/isMod");
const userCtrl = require("../controllers/user");

router.get("/", auth, userCtrl.listUsers);
router.delete("/:id", auth, userCtrl.delUser);
router.put("/:id", auth, isAdmin, userCtrl.modUser);

module.exports = router;
