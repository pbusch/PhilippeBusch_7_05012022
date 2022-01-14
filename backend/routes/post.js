const express = require("express");
const router = express.Router();
const auth = require("../middleware/authCheck");
const isAdmin = require("../middleware/isAdmin");
const isMod = require("../middleware/isMod");
const postCtrl = require("../controllers/post");

router.get("/", auth, postCtrl.listPosts);
router.get("/:id", auth, postCtrl.getOnePost);
router.post("/add", auth, postCtrl.addPost);
router.post("/comment/:id", auth, postCtrl.addComment);
router.delete("/delpost/:id", auth, isMod, postCtrl.delPost);
router.delete("/delcomment/:id", auth, isMod, postCtrl.delComment);

module.exports = router;
