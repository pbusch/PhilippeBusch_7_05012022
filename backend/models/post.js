module.exports = (sequelize, Sequelize) => {
  const Post = sequelize.define("post", {
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

  return Post;
};
