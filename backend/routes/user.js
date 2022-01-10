const express = require("express");
const router = express.Router();
const auth = require("../middleware/auth");
const isAdmin = require("../middleware/isAdmin");
const isMod = require("../middleware/isMod");
const userCtrl = require("../controllers/user");

router.post("/signup", userCtrl.signup);
router.post("/login", userCtrl.login);
router.get("/listusers", auth, isMod, userCtrl.listUsers);
router.delete("/remove", auth, userCtrl.delSelf);
router.delete("/deluser/:id", auth, isAdmin, userCtrl.delUser);
router.put("/level/:id", auth, isAdmin, userCtrl.changeLevel);

module.exports = router;
