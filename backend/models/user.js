module.exports = (sequelize, Sequelize) => {
  const User = sequelize.define(
    "user",
    {
      name: {
        type: Sequelize.STRING,
      },
      email: {
        type: Sequelize.STRING,
        unique: true,
      },
      password: {
        type: Sequelize.STRING,
      },
      level: {
        type: Sequelize.INTEGER,
        //defaultValue: 1,
      },
    },
    {
      timestamps: false,
    }
  );

  return User;
};
