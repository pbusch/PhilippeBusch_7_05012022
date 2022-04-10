module.exports = {
  HOST: process.env.HOST || "localhost",
  USER: process.env.DB_USER || "groupomania",
  PASSWORD: process.env.DB_PWD || "aaa",
  DB: "groupomania",
  dialect: "postgres",
  pool: {
    max: 5,
    min: 0,
    acquire: 30000,
    idle: 10000,
  },
};
