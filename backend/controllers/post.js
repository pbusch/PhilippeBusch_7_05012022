const db = require("../models");
const Posts = db.posts;
const Op = db.Sequelize.Op;

exports.listPosts = (req, res) => {
  Posts.findAll({})
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
    users_id: req.token.userId,
    title: req.body.title,
    imgUrl: req.body.imgUrl,
  };
  Posts.create(post)
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "error ",
      });
    });
};
