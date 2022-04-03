const db = require("../models");
const User = db.user;
const Op = db.Sequelize.Op;
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { post, like, comment, user } = require("../models");

exports.listUsers = (req, res) => {
  if (req.token.level < 2) {
    return res.status(401).json({ error: { message: "Mod level required" } });
  }
  User.findAll({
    order: [["name", "ASC"]],
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

exports.userInfo = (req, res) => {
  if (isNaN(req.params.id)) {
    return res.status(400).json({ error: { message: "invalid parameter" } });
  }

  post
    .count({ where: { creatorId: req.params.id } })
    .then(function (totalPosts) {
      like
        .count({ where: { creatorId: req.params.id } })
        .then(function (totalLikes) {
          comment
            .count({ where: { creatorId: req.params.id } })
            .then(function (totalComments) {
              User.findOne({ where: { id: req.params.id } })
                .then((data) => {
                  if (!data) {
                    return res
                      .status(404)
                      .json({ error: { message: "User not found" } });
                  }
                  res.set("x-total-posts", totalPosts);
                  res.set("x-total-likes", totalLikes);
                  res.set("x-total-comments", totalComments);
                  res.send(data);
                })
                .catch((error) => res.status(400).json({ error }));
            })
            .catch((error) => console.log(error));
        })
        .catch((error) => console.log(error));
    })
    .catch((error) => console.log(error));
};

exports.delUser = (req, res) => {
  User.destroy({
    where: { id: req.params.id },
  })
    .then((data) => {
      if (data !== 0) {
        res.status(200).json({ message: "User removed" });
      } else {
        res.status(404).json({ message: "User not found" });
      }
    })
    .catch((error) => res.status(400).json({ error }));
};

exports.modUser = (req, res) => {
  if (isNaN(req.params.id)) {
    return res.status(400).json({ error: { message: "invalid parameter" } });
  }

  let level = req.token.level;
  if ((req.token.level = 3)) {
    level = req.body.level;
  }

  if (req.token.userId != req.params.id && req.token.level < 3) {
    return res.status(401).json({ error: { message: "Admin level required" } });
  }

  // if (req.token.level < 3 && req.body.level != null) {
  //   return res.status(401).json({
  //     error: {
  //       message: "Lvl change is for Admin only - Modifications canceled",
  //     },
  //   });
  // }

  if (req.body.newPassword && req.body.newPassword != "no!") {
    bcrypt
      .hash(req.body.newPassword, 10)
      .then((hash) => {
        User.update(
          {
            level: level,
            name: req.body.name,
            password: hash,
          },
          { where: { id: req.params.id } }
        )
          .then((data) => {
            if (data.includes(1)) {
              res.status(200).json({ message: "User Updated" });
            } else {
              res.status(404).json({ message: "User not found" });
            }
          })
          .catch((error) => res.status(400).json({ error }));
      })
      .catch((err) => {
        res.status(500).send({
          message: err.message || "error ",
        });
      });
  } else {
    User.update(
      {
        level: level,
        name: req.body.name,
        mail: req.body.email,
      },
      { where: { id: req.params.id } }
    )
      .then((data) => {
        if (data.includes(1)) {
          res.status(200).json({ message: "User Updated" });
        } else {
          res.status(404).json({ message: "User not found" });
        }
      })
      .catch((error) => res.status(400).json({ error }));
  }
};
