const db = require("../models");
const users = require("../models/user");
const Comment = db.comment;
const Post = db.post;
const User = db.user;
const Op = db.Sequelize.Op;

exports.listPosts = (req, res) => {
  Post.findAll({
    limit: 10,
    order: [["createdAt", "DESC"]],
    include: [{ model: db.user }],
  })
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "error",
      });
    });
};

exports.getOnePost = (req, res) => {
  Post.findOne({
    attributes: ["title"],
    where: { id: req.params.id },
    include: [
      { model: db.user, attributes: ["name"] },
      {
        model: db.comment,
        attributes: ["commentText"],
        include: [{ model: db.user, attributes: ["name"] }],
      },
    ],
  })
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "error",
      });
    });
};

exports.addPost = (req, res) => {
  const post = {
    userId: req.token.userId,
    title: req.body.title,
    imgUrl: req.body.imgUrl,
  };
  Post.create(post)
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "error ",
      });
    });
};

exports.addComment = (req, res) => {
  const comment = {
    userId: req.token.userId,
    commentText: req.body.text,
    postId: req.params.id,
  };
  Comment.create(comment)
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "error ",
      });
    });
};
