const express = require("express");
const app = express();
const userRoutes = require("./routes/user");
const postRoutes = require("./routes/post");
const authRoutes = require("./routes/auth");
const bcrypt = require("bcrypt");
const path = require("path");
require("dotenv").config();
const db = require("./models");
const { sequelize } = require("./models");

// initialisation de la BDD et création du compte admin

bcrypt.hash("GMAdmin", 10).then((hash) => {
  db.sequelize
    .sync()
    .then(() =>
      db.user.create({
        name: "admin",
        email: "admin@groupomania.fr",
        password: hash,
        level: "3",
      })
    )
    .catch((error) => {});
});

// configuration de CORS

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content, Accept, Content-Type, Authorization, api_key"
  );
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, PUT, DELETE, PATCH, OPTIONS"
  );
  res.setHeader("Access-Control-Expose-Headers", "*");
  next();
});

// Body parser

app.use(express.json());

// Path dossier "images"

app.use("/images", express.static(path.join(__dirname, "images")));

// Routes

app.use("/api/users", userRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/posts", postRoutes);

module.exports = app;
