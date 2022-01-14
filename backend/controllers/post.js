const { Sequelize } = require("../models");
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
    include: [
      { model: db.user, attributes: ["name"] },
      {
        model: db.comment,
        attributes: [
          "commentText",
          //  [Sequelize.fn("COUNT", "postId"), "Commentaires"],
        ],
        //include: [db.user],
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

exports.delPost = (req, res) => {
  Post.destroy({
    where: { id: req.params.id },
  })
    .then((data) => {
      if (data !== 0) {
        res.status(200).json({ message: "Post removed by Admin" });
      } else {
        res.status(404).json({ message: "Post not found" });
      }
    })
    .catch((error) => res.status(400).json({ error }));
};

exports.delComment = (req, res) => {
  Comment.destroy({
    where: { id: req.params.id },
  })
    .then((data) => {
      if (data !== 0) {
        res.status(200).json({ message: "Comment removed by Admin" });
      } else {
        res.status(404).json({ message: "Comment not found" });
      }
    })
    .catch((error) => res.status(400).json({ error }));
};
