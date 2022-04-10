const db = require("../models");
const User = db.user;
const bcrypt = require("bcrypt");
const { post, like, comment, user } = require("../models");

// Liste des utilisateurs
exports.listUsers = (req, res) => {
  if (req.token.level < 3) {
    return res.status(401).json({ error: { message: "Admin level required" } });
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

// Récupération d'un utiisateur - Avec calcul du nombre de Posts / likes / commentaires
exports.userInfo = (req, res) => {
  const userId = parseInt(req.token.userId);
  const paramId = parseInt(req.params.id);

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
              User.findOne({
                attributes: { exclude: ["password"] },
                where: { id: req.params.id },
              })
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

// Suppression d'un utilisateur
exports.delUser = (req, res) => {
  const userId = parseInt(req.token.userId);
  const paramId = parseInt(req.params.id);

  if (isNaN(req.params.id)) {
    return res.status(400).json({ error: { message: "invalid parameter" } });
  }
  if (req.token.level < 3 && userId !== paramId) {
    return res.status(400).json({ error: { message: "Admin level required" } });
  }

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

// Modification d'un utilisateur (optionnel : changement du mot de passe)
exports.modUser = (req, res) => {
  const userId = parseInt(req.token.userId);
  const paramId = parseInt(req.params.id);
  const email = req.body.email;

  if (isNaN(req.params.id)) {
    return res.status(400).json({ error: { message: "invalid parameter" } });
  }
  if (req.token.level < 3 && userId !== paramId) {
    return res.status(400).json({ error: { message: "Admin level required" } });
  }

  let level = req.token.level;
  if ((req.token.level = 3)) {
    level = req.body.level;
  }

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
        email: email.toLowerCase(),
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
