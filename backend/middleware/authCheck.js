const jwt = require("jsonwebtoken");

module.exports = (req, res, next) => {
  if (req.method !== "OPTIONS") {
    try {
      const token = req.headers.authorization.split(" ")[1];
      req.token = jwt.verify(token, process.env.APP_SECRET || "defaultSecret");
      console.log(req.token.userId);
      console.log(req.token.level);
      next();
    } catch {
      res.status(401).json({
        error: new Error("Invalid request!"),
      });
    }
  } else {
    next();
  }
};
