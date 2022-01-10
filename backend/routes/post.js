const express = require("express");
const router = express.Router();
const auth = require("../middleware/auth");
const isAdmin = require("../middleware/isAdmin");
const isMod = require("../middleware/isMod");
const postCtrl = require("../controllers/post");

router.get("/", postCtrl.listPosts);
router.post("/add", postCtrl.addPost);

module.exports = router;
