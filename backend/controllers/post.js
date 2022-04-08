//const { Sequelize, like, post } = require("../models");
const db = require("../models");
//const users = require("../models/user");
const Comment = db.comment;
const Post = db.post;
const Like = db.like;
//const User = db.user;
//const Op = db.Sequelize.Op;
const fs = require("fs");

exports.listPosts = (req, res) => {
  if (req.query.creator !== "0") {
    let creator = req.query.creator;
    Post.findAndCountAll({
      where: { creatorId: creator },
      limit: req.query.limit || 10,
      offset: req.query.offset || 0,
      distinct: true,
      order: [
        ["createdAt", "DESC"],
        [{ model: db.comment }, "id", "ASC"],
      ],
      include: [
        {
          model: db.like,
          attributes: ["id"],
          include: [
            { model: db.user, attributes: ["name", "id"], as: "creator" },
          ],
        },

        { model: db.user, attributes: ["name", "id"], as: "creator" },

        {
          model: db.comment,
          attributes: ["commentText", "createdAt", "id"],

          include: [
            { model: db.user, attributes: ["name", "id"], as: "creator" },
          ],
        },
      ],
    })
      .then((data) => {
        res.set("x-total-count", data.count);
        res.send(data.rows);
      })
      .catch((err) => {
        res.status(500).send({
          message: err.message || "error",
        });
      });
  } else {
    Post.findAndCountAll({
      limit: req.query.limit || 10,
      offset: req.query.offset || 0,
      distinct: true,
      order: [
        ["createdAt", "DESC"],
        [{ model: db.comment }, "id", "ASC"],
      ],
      include: [
        {
          model: db.like,
          attributes: ["id"],
          include: [
            { model: db.user, attributes: ["name", "id"], as: "creator" },
          ],
        },

        { model: db.user, attributes: ["name", "id"], as: "creator" },

        {
          model: db.comment,
          attributes: ["commentText", "createdAt", "id"],

          include: [
            { model: db.user, attributes: ["name", "id"], as: "creator" },
          ],
        },
      ],
    })
      .then((data) => {
        res.set("x-total-count", data.count);
        res.send(data.rows);
      })
      .catch((err) => {
        res.status(500).send({
          message: err.message || "error",
        });
      });
  }
};

exports.likePost = (req, res) => {
  const like = {
    creatorId: req.token.userId,
    postId: req.params.id,
  };

  Like.findOne({
    attributes: ["id", "creatorId"],
    where: { creatorId: req.token.userId, postId: req.params.id },
  })
    .then((data) => {
      if (data === null) {
        console.log("ok");

        Like.create(like)
          .then((data) => {
            Post.findOne({
              attributes: ["title", "imgUrl", "createdAt", "id"],
              where: { id: req.params.id },
              include: [
                {
                  model: db.like,
                  attributes: ["id"],
                  include: [
                    {
                      model: db.user,
                      attributes: ["name", "id"],
                      as: "creator",
                    },
                  ],
                },

                { model: db.user, attributes: ["name", "id"], as: "creator" },

                {
                  model: db.comment,
                  attributes: ["commentText", "createdAt", "id"],

                  include: [
                    {
                      model: db.user,
                      attributes: ["name", "id"],
                      as: "creator",
                    },
                  ],
                },
              ],
            })
              .then((data) => {
                res.send(data);
              })
              .catch((err) => {
                res.status(500).send({
                  message: err.message || "error",
                });
              });
          })

          .catch((err) => {
            res.status(500).send({
              message: err.message || "error ",
            });
          });
      } else {
        Like.destroy({
          where: { creatorId: req.token.userId, postId: req.params.id },
        })
          .then(() => {
            Post.findOne({
              attributes: ["title", "imgUrl", "createdAt", "id"],
              where: { id: req.params.id },
              include: [
                {
                  model: db.like,
                  attributes: ["id"],
                  include: [
                    {
                      model: db.user,
                      attributes: ["name", "id"],
                      as: "creator",
                    },
                  ],
                },

                {
                  model: db.user,
                  attributes: ["name", "id"],
                  as: "creator",
                },

                {
                  model: db.comment,
                  attributes: ["commentText", "createdAt", "id"],

                  include: [
                    {
                      model: db.user,
                      attributes: ["name", "id"],
                      as: "creator",
                    },
                  ],
                },
              ],
            })
              .then((data) => {
                res.send(data);
              })
              .catch((err) => {
                res.status(500).send({
                  message: err.message || "error",
                });
              });
          })
          .catch((error) => res.status(400).json({ error }));
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "error",
      });
    });
};

exports.getOnePost = (req, res) => {
  Post.findOne({
    attributes: ["title", "imgUrl", "createdAt", "id"],
    where: { id: req.params.id },
    include: [
      {
        model: db.like,
        attributes: ["id"],
        include: [
          { model: db.user, attributes: ["name", "id"], as: "creator" },
        ],
      },

      { model: db.user, attributes: ["name", "id"], as: "creator" },

      {
        model: db.comment,
        attributes: ["commentText", "createdAt", "id"],

        include: [
          { model: db.user, attributes: ["name", "id"], as: "creator" },
        ],
      },
    ],
  })
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "error",
      });
    });
};

exports.getPostComments = (req, res) => {
  Comment.findAll({
    attributes: ["commentText", "createdAt", "id"],
    where: { postId: req.params.id },
    include: [{ model: db.user, attributes: ["name", "id"], as: "creator" }],
  })
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "error",
      });
    });
};

exports.updatePost = (req, res) => {
  Post.update(
    {
      title: req.body.text,
    },
    { where: { id: req.params.id } }
  )
    .then((data) => {
      Post.findOne({
        attributes: ["title", "imgUrl", "createdAt", "id"],
        where: { id: req.params.id },
        include: [
          {
            model: db.like,
            attributes: ["id"],
            include: [
              {
                model: db.user,
                attributes: ["name", "id"],
                as: "creator",
              },
            ],
          },

          { model: db.user, attributes: ["name", "id"], as: "creator" },

          {
            model: db.comment,
            attributes: ["commentText", "createdAt", "id"],

            include: [
              {
                model: db.user,
                attributes: ["name", "id"],
                as: "creator",
              },
            ],
          },
        ],
      })
        .then((data) => {
          res.send(data);
        })
        .catch((err) => {
          res.status(500).send({
            message: err.message || "error",
          });
        });
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "error",
      });
    });
};

exports.addPost = (req, res) => {
  const post = {
    creatorId: req.token.userId,
    title: req.body.title,
    imgUrl: `${req.protocol}://${req.get("host")}/images/${req.file.filename}`,
  };
  Post.create(post)
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "error ",
      });
    });
};

exports.addComment = (req, res) => {
  const comment = {
    creatorId: req.token.userId,
    commentText: req.body.text,
    postId: req.params.id,
  };
  Comment.create(comment)
    .then((data) => {
      Post.findOne({
        attributes: ["title", "imgUrl", "createdAt", "id"],
        where: { id: req.params.id },
        order: [
          ["createdAt", "DESC"],
          [{ model: db.comment }, "id", "ASC"],
        ],
        include: [
          {
            model: db.like,
            attributes: ["id"],
            include: [
              { model: db.user, attributes: ["name", "id"], as: "creator" },
            ],
          },

          { model: db.user, attributes: ["name", "id"], as: "creator" },

          {
            model: db.comment,
            attributes: ["commentText", "createdAt", "id"],

            include: [
              { model: db.user, attributes: ["name", "id"], as: "creator" },
            ],
          },
        ],
      })
        .then((data) => {
          res.send(data);
        })
        .catch((err) => {
          res.status(500).send({
            message: err.message || "error",
          });
        });

      //res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "error ",
      });
    });
};

exports.delPost = (req, res) => {
  Post.findOne({
    attributes: ["title", "imgUrl", "createdAt", "id"],
    where: { id: req.params.id },
  })
    .then((data) => {
      const filename = data.imgUrl.split("/images/")[1];
      fs.unlink(`images/${filename}`, (error) => {
        if (error) {
          return res.status(400).json({ error });
        }
        Post.destroy({
          where: { id: req.params.id },
        })
          .then((data) => {
            if (data !== 0) {
              res.status(200).json({ message: "Post removed by Admin" });
            } else {
              res.status(404).json({ message: "Post not found" });
            }
          })
          .catch((error) => res.status(400).json({ error }));
      });
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "error",
      });
    });
};

exports.delComment = (req, res) => {
  Comment.destroy({
    where: { id: req.params.id },
  })
    .then((data) => {
      Post.findOne({
        attributes: ["title", "imgUrl", "createdAt", "id"],
        where: { id: req.params.post },
        order: [
          ["createdAt", "DESC"],
          [{ model: db.comment }, "id", "ASC"],
        ],
        include: [
          {
            model: db.like,
            attributes: ["id"],
            include: [
              { model: db.user, attributes: ["name", "id"], as: "creator" },
            ],
          },

          { model: db.user, attributes: ["name", "id"], as: "creator" },

          {
            model: db.comment,
            attributes: ["commentText", "createdAt", "id"],

            include: [
              { model: db.user, attributes: ["name", "id"], as: "creator" },
            ],
          },
        ],
      })
        .then((data) => {
          res.send(data);
        })
        .catch((err) => {
          res.status(500).send({
            message: err.message || "error",
          });
        });
    })
    .catch((error) => res.status(400).json({ error }));
};
