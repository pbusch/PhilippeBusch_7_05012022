const express = require("express");
const router = express.Router();
const auth = require("../middleware/authCheck");
const isAdmin = require("../middleware/isAdmin");
const isMod = require("../middleware/isMod");
const postCtrl = require("../controllers/post");
const multer = require("../middleware/multer-config");

router.get("/", auth, postCtrl.listPosts);
router.get("/:id", auth, postCtrl.getOnePost);
router.post("/", auth, multer, postCtrl.addPost);
router.get("/comments/:id", auth, postCtrl.getPostComments);
router.post("/comments/:id", auth, postCtrl.addComment);
router.delete("/:id", auth, postCtrl.delPost);
router.delete("/delcomment/:id", auth, isMod, postCtrl.delComment);
router.put("/:id", auth, multer, postCtrl.updatePost);

module.exports = router;
