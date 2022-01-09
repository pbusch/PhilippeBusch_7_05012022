const db = require("../models");
const Users = db.users;

module.exports = (req, res, next) => {
  const userId = req.token.userId;
  Users.findOne({ where: { id: userId } })
    .then((data) => {
      if (!data) {
        return res.status(401).json({ error: { message: "Wrong user" } });
      }

      if (data.level < 3) {
        return res
          .status(401)
          .json({ error: { message: "Admin level required" } });
      }
      next();
    })
    .catch((error) => res.status(400).json({ error }));
};
