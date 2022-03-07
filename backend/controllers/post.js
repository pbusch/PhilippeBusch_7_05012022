const { Sequelize } = require("../models");
const db = require("../models");
const users = require("../models/user");
const Comment = db.comment;
const Post = db.post;
const User = db.user;
const Op = db.Sequelize.Op;
const fs = require("fs");

exports.listPosts = (req, res) => {
  Post.findAll({
    // attributes: {
    //   include: [[Sequelize.fn("COUNT", Sequelize.col("comment.id")), "commentsCount"]
    // },
    // include [{
    //   model: db.comment, attributes: []
    // }],
    // group: ['id']})

    //limit: 10,
    order: [
      ["createdAt", "DESC"],
      [{ model: db.comment }, "id", "ASC"],
    ],

    include: [
      { model: db.user, attributes: ["name", "id"], as: "creator" },

      {
        model: db.comment,
        attributes: ["commentText", "createdAt", "id"],

        include: [
          { model: db.user, attributes: ["name", "id"], as: "creator" },
        ],
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
    attributes: ["title", "imgUrl", "createdAt"],
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

exports.getPostComments = (req, res) => {
  Comment.findAll({
    attributes: ["commentText", "createdAt", "id"],
    where: { postId: req.params.id },
    include: [{ model: db.user, attributes: ["name", "id"], as: "creator" }],
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

exports.updatePost = (req, res) => {
  // const postObject = req.file
  //   ? {
  //       ...JSON.parse(req.body.title),
  //       imageUrl: `${req.protocol}://${req.get("host")}/images/${
  //         req.file.filename
  //       }`,
  //     }
  //   : { ...req.body };

  Post.update(
    {
      title: req.body.title,
      imgUrl: `${req.protocol}://${req.get("host")}/images/${
        req.file.filename
      }`,
    },
    { where: { id: req.params.id } }
  )
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
    creatorId: req.token.userId,
    title: req.body.title,
    imgUrl: `${req.protocol}://${req.get("host")}/images/${req.file.filename}`,
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
    creatorId: req.token.userId,
    commentText: req.body.text,
    postId: req.params.id,
  };
  console.log(req.body.text);
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
