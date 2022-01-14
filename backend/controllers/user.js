const db = require("../models");
const User = db.user;
const Op = db.Sequelize.Op;
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

exports.listUsers = (req, res) => {
  if (req.token.level < 2) {
    return res.status(401).json({ error: { message: "Mod level required" } });
  }
  User.findAll({})
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "error",
      });
    });
};

exports.delUser = (req, res) => {
  if (req.token.userId != req.params.id && req.token.level < 3) {
    return res.status(401).json({ error: { message: "Admin level required" } });
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

exports.modUser = (req, res) => {
  User.update({ level: req.body.level }, { where: { id: req.params.id } })
    //.then(() => res.status(200).json({ message: "User modified" }))
    .then((data) => {
      if (data.includes(1)) {
        res.status(200).json({ message: "User level changed" });
      } else {
        res.status(404).json({ message: "User not found" });
      }
    })
    .catch((error) => res.status(400).json({ error }));
};
