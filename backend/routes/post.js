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
router.get("/:id/comments", auth, postCtrl.getPostComments);
router.post("/:id", auth, postCtrl.addComment);
router.delete("/:id", auth, postCtrl.delPost);
router.delete("/comments/:id", auth, postCtrl.delComment);
router.put("/:id", auth, multer, postCtrl.updatePost);
router.post("/:id/like", auth, postCtrl.likePost);

module.exports = router;
