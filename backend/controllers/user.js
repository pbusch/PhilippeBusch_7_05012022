const db = require("../models");
const Users = db.users;
const Op = db.Sequelize.Op;
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const passwordValidator = require("password-validator");

exports.signup = (req, res) => {
  const emailformat = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(
    String(req.body.email).toLowerCase()
  );

  if (!emailformat) {
    return res.status(400).json({ error: "invalid email" });
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
    Users.create(user)
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
  Users.findOne({ where: { email: email } })
    .then((user) => {
      if (!user) {
        return res.status(401).json({ error: "User not found" });
      }
      console.log(req.body.password);
      console.log(user.password);
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
              { userId: user.id },
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

exports.listUsers = (req, res) => {
  console.log(Users.level);
  Users.findAll({})
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "error",
      });
    });
};

exports.delSelf = (req, res) => {
  const userId = req.token.userId;

  Users.destroy({
    where: { id: userId },
  })
    .then(() => res.status(200).json({ message: "User self removed" }))
    .catch((error) => res.status(400).json({ error }));
};

exports.delUser = (req, res) => {
  Users.destroy({
    where: { id: req.params.id },
  })
    //.then(() => res.status(200).json({ message: "User removed by Admin" }))
    .then((data) => {
      console.log(data);
      if (data !== 0) {
        res.status(200).json({ message: "User removed by Admin" });
      } else {
        res.status(404).json({ message: "User not found" });
      }
    })
    .catch((error) => res.status(400).json({ error }));
};

exports.changeLevel = (req, res) => {
  Users.update({ level: req.body.level }, { where: { id: req.params.id } })
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
