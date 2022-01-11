const dbConfig = require("../config/db.js");

const Sequelize = require("sequelize");
const sequelize = new Sequelize(dbConfig.DB, dbConfig.USER, dbConfig.PASSWORD, {
  host: dbConfig.HOST,
  dialect: dbConfig.dialect,
  operatorsAliases: 0,

  pool: {
    max: dbConfig.pool.max,
    min: dbConfig.pool.min,
    acquire: dbConfig.pool.acquire,
    idle: dbConfig.pool.idle,
  },
});

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.user = require("./user")(sequelize, Sequelize);
db.post = require("./post")(sequelize, Sequelize);
db.comment = require("./comment")(sequelize, Sequelize);
db.like = require("./like")(sequelize, Sequelize);

db.user.hasMany(db.post);
db.post.belongsTo(db.user);

db.user.hasMany(db.comment);
db.comment.belongsTo(db.user);

db.post.hasMany(db.comment);
db.comment.belongsTo(db.post);

db.user.hasMany(db.like);
db.like.belongsTo(db.user);

db.post.hasMany(db.like);
db.like.belongsTo(db.post);

//sequelize.sync({ loggin: console.log });

module.exports = db;
