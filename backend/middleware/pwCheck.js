const db = require("../models");
const User = db.user;
const Op = db.Sequelize.Op;
const bcrypt = require("bcrypt");

module.exports = (req, res, next) => {
  if (isNaN(req.params.id)) {
    return res.status(400).json({ error: { message: "invalid parameter" } });
  }
  if (req.token.userId != req.params.id && req.token.level < 3) {
    return res.status(403).json({ error: { message: "Admin level required" } });
  }
  if (req.body.newPassword && !req.body.password && req.token.level < 3) {
    return res
      .status(400)
      .json({ error: { message: "Invalid current password" } });
  }

  if (!req.body.password || req.token.level > 2) {
    next();
  } else {
    User.findOne({ where: { id: req.params.id } })
      .then((user) => {
        if (!user) {
          return res.status(403).json({ error: "User not found" });
        }
        bcrypt
          .compare(req.body.password, user.password)
          .then((valid) => {
            if (!valid) {
              console.log(valid);
              return res.status(403).json({ error: "Incorrect password" });
            } else {
              console.log(valid);
              next();
            }
          })
          .catch((error) => res.status(500).json({ error }));
      })
      .catch((error) => res.status(500).json({ error }));
  }
};
