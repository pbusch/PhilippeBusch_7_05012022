const jwt = require("jsonwebtoken");

// Vérification du Token
module.exports = (req, res, next) => {
  if (req.method !== "OPTIONS") {
    try {
      const token = req.headers.authorization.split(" ")[1];
      req.token = jwt.verify(token, process.env.APP_SECRET || "defaultSecret");
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
