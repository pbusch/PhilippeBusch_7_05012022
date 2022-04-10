const db = require("../models");
const User = db.user;
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

// Inscription
exports.signup = (req, res) => {
  if (!req.body.password) {
    return res.status(400).json({ error: "No password provided" });
  }
  bcrypt.hash(req.body.password, 10).then((hash) => {
    const email = req.body.email;
    const user = {
      name: req.body.name,
      email: email.toLowerCase(),
      password: hash,
      level: "1",
    };
    User.create(user)
      .then(() => {
        res.status(201).send();
      })
      .catch((error) => res.status(500).json({ error }));
  });
};

// Authentification
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
        })
        .catch((error) => res.status(500).json({ error }));
    })
    .catch((error) => res.status(500).json({ error }));
};
