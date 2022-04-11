const db = require("../models");
const Comment = db.comment;
const Post = db.post;
const Like = db.like;
const fs = require("fs");

// Récupération des Posts. Params  : Offset, Limit, Creator
exports.listPosts = (req, res) => {
  let creator = req.query.creator;
  Post.findAndCountAll({
    where: JSON.parse(JSON.stringify({ creatorId: creator })),
    limit: req.query.limit || 3,
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
};

// Ajout / suppresion de 'likes'
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
        Like.create(like)
          .then(() => {
            returnOnePost(req.params.id).then((data) => res.send(data));
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
            returnOnePost(req.params.id).then((data) => res.send(data));
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

// Récupération des commentaires
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

// Mise à jour d'un Post
exports.updatePost = (req, res) => {
  Post.update(
    {
      title: req.body.text,
    },
    { where: { id: req.params.id } }
  )
    .then(() => {
      returnOnePost(req.params.id).then((data) => res.send(data));
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "error",
      });
    });
};

// Ajout d'un Post
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

// Ajout d'un commentaire
exports.addComment = (req, res) => {
  const comment = {
    creatorId: req.token.userId,
    commentText: req.body.text,
    postId: req.params.id,
  };
  Comment.create(comment)
    .then(() => {
      returnOnePost(req.params.id).then((data) => res.send(data));
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "error ",
      });
    });
};

// Suppression d'un Post
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
              res.status(200).json({ message: "Post removed" });
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

// Suppression d'un commentaire
exports.delComment = (req, res) => {
  Comment.destroy({
    where: { id: req.params.id },
  })
    .then(() => {
      returnOnePost(req.params.post).then((data) => res.send(data));
    })
    .catch((error) => res.status(400).json({ error }));
};

// Fonction partagée de récupération d'un Post
async function returnOnePost(postId) {
  const data = await Post.findOne({
    attributes: ["title", "imgUrl", "createdAt", "id"],
    where: { id: postId },
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
  });
  return data;
}
