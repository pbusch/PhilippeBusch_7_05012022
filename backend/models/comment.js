module.exports = (sequelize, Sequelize) => {
  const Comment = sequelize.define("comment", {
    commentText: {
      type: Sequelize.STRING,
    },
  });

  return Comment;
};
