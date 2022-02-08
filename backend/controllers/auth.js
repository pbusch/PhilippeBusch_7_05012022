const db = require("../models");
const User = db.user;
const Op = db.Sequelize.Op;
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

exports.signup = (req, res) => {
  if (!req.body.password) {
    return res.status(400).json({ error: "No password provided" });
  }
  bcrypt.hash(req.body.password, 10).then((hash) => {
    const user = {
      name: req.body.name,
      email: req.body.email,
      password: hash,
      level: "1",
    };
    User.create(user)
      .then((data) => {
        res.send(data);
        //res.status(200).json({ message: "User created" });
      })
      .catch((err) => {
        res.status(500).send({
          message: err.message || "error ",
        });
      });
  });
};

exports.login = (req, res) => {
  const email = req.body.email;
  User.findOne({ where: { email: email } })
    .then((user) => {
      if (!user) {
        return res.status(401).json({ error: "User not found" });
      }
      bcrypt
        .compare(req.body.password, user.password)
        .then((valid) => {
          if (!valid) {
            return res.status(401).json({ error: { message: "error" } });
          }

          res.status(200).json({
            token: jwt.sign(
              { userId: user.id, level: user.level },
              process.env.APP_SECRET || "defaultSecret",
              {
                expiresIn: "24h",
              }
            ),
          });
          //res.cookie("token", token, { httpOnly: true });
        })
        .catch((error) => res.status(500).json({ error }));
    })
    .catch((error) => res.status(500).json({ error }));
};
