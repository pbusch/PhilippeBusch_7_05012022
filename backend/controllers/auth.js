const db = require("../models");
const User = db.user;
const Op = db.Sequelize.Op;
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const passwordValidator = require("password-validator");

exports.signup = (req, res) => {
  const emailFormat = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(
    String(req.body.email).toLowerCase()
  );

  if (!emailFormat) {
    return res.status(400).json({ error: "invalid email" });
  }

  const nameFormat =
    /^[a-zA-ZàáâäãåąčćęèéêëėįìíîïłńòóôöõøùúûüųūÿýżźñçčšžÀÁÂÄÃÅĄĆČĖĘÈÉÊËÌÍÎÏĮŁŃÒÓÔÖÕØÙÚÛÜŲŪŸÝŻŹÑßÇŒÆČŠŽ∂ð ,.'-]+$/.test(
      String(req.body.name)
    );

  if (!nameFormat) {
    return res.status(400).json({ error: "invalid name" });
  }

  const schema = new passwordValidator();
  schema.is().min(3);

  if (!schema.validate(req.body.password)) {
    return res.status(400).json({ error: "invalid password" });
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
            return res
              .status(401)
              .json({ error: { message: "Incorrect password" } });
          }
          res.status(200).json({
            userId: user.id,
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
