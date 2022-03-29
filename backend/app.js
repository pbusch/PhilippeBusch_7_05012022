const express = require("express");
const app = express();
//const Pool = require("pg").Pool;
const userRoutes = require("./routes/user");
const postRoutes = require("./routes/post");
const authRoutes = require("./routes/auth");
const path = require("path");
require("dotenv").config();
const db = require("./models");
db.sequelize.sync();

// ----
// Pool Postgres
//const pool = new Pool({
//  user: "groupomania",
//  host: "localhost",
//  database: "groupomania",
//  password: "aaa",
//  dialect: "postgres",
//  port: 5432,
//});
//pool.connect((err, client, release) => {
//  if (err) {
//    return console.error("Error acquiring client", err.stack);
//  }
//  client.query("SELECT NOW()", (err, result) => {
//    release();
//   if (err) {
//      return console.error("Error executing query", err.stack);
//    }
//    console.log("Connected to Database !");
//  });
//});
// ---

// contrôles d'accès CORS
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

app.use(express.json());
app.use("/images", express.static(path.join(__dirname, "images")));

// routes d'authentification
app.use("/api/users", userRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/posts", postRoutes);

module.exports = app;
