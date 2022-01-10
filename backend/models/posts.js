module.exports = (sequelize, Sequelize) => {
  const Posts = sequelize.define("posts", {
    users_id: {
      type: Sequelize.STRING,
    },
    title: {
      type: Sequelize.STRING,
    },
    imgUrl: {
      type: Sequelize.STRING,
    },
    //created_at: {
    //  type: Sequelize.DATE,
    //  defaultValue: Sequelize.NOW,
    //},
    //modified_at: {
    // type: Sequelize.DATE,
    //defaultValue: Sequelize.NOW,
    //},
  });

  return Posts;
};
