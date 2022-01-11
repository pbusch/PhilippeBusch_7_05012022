const db = require("../models");
const User = db.user;

module.exports = (req, res, next) => {
  const userId = req.token.userId;
  User.findOne({ where: { id: userId } })
    .then((data) => {
      if (!data) {
        return res.status(401).json({ error: { message: "Wrong user" } });
      }

      if (data.level < 2) {
        return res
          .status(401)
          .json({ error: { message: "Mod level required" } });
      }
      next();
    })
    .catch((error) => res.status(400).json({ error }));
};
