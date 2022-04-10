const express = require("express");
const router = express.Router();
const auth = require("../middleware/authCheck");
const postCtrl = require("../controllers/post");
const multer = require("../middleware/multer-config");

// Routes de publications (Posts)

//router.get("/:offset&:limit&:creator", auth, postCtrl.listPosts);
router.get("/", auth, postCtrl.listPosts);
router.post("/", auth, multer, postCtrl.addPost);
router.get("/:id/comments", auth, postCtrl.getPostComments);
router.post("/:id", auth, postCtrl.addComment);
router.delete("/:id", auth, postCtrl.delPost);
router.delete("/comments/:id&:post", auth, postCtrl.delComment);
router.put("/:id", auth, postCtrl.updatePost);
router.post("/:id/like", auth, postCtrl.likePost);

module.exports = router;
