import Comment from "../db/models/Comment.js";
import User from "../db/models/user.model.js";
import Post from "../db/models/post.model.js";

const commentsRoutes = (app) => {
  app.get("/comments", async (req, res) => {

    const { page, limit } = req.query;

    if (limit) {
      const comments = await Comment.query().withGraphFetched("[author, post]").limit(limit);
      res.send(comments);

      return;
    }

    await Comment.query()
      .withGraphFetched("[author, post]")
      .then((comments) => {
        res.send(comments);
      });
  });

  app.get("/comments/:id", async (req, res) => {
    const { id: commentId } = req.params;

    const comment = await Comment.query()
      .withGraphFetched("[author, post]")
      .findById(commentId);

    if (!comment) {
      res.status(404).send({ error: "Sorry, comment not found !" });

      return;
    }

    res.send(comment);
  });

  app.get("/posts/:id/comments", async (req, res) => {
    const { id: postId } = req.params;

    if (!Number(postId)) {
      res.status(400).send({ error: "Sorry postId are missing !" });

      return;
    }
    const comments = await Comment.query().where("postId", postId);

    res.send(comments);
  });

  app.post("/comments", async (req, res) => {
    const { content, createdAt, updatedAt, authorId, postId } = req.body;

    // TODO: Vérifier si le post est public ou privé

    const user = await User.query().findById(authorId);

    if (!user) {
      res.status(404).send({ error: "Sorry, user not found !" });

      return;
    }

    const post = await Post.query().findById(postId);

    if (!post) {
      res.status(404).send({ error: "Sorry, post not found !" });

      return;
    }

    const comment = await Comment.query().insert({
      content,
      createdAt,
      updatedAt,
      authorId,
      postId,
    });

    res.status(201).send(comment);
  });

  app.patch("/comments/:id", async (req, res) => {
    const { id: commentId } = req.params;

    const { content, updatedAt } = req.body;

    const comment = await Comment.query().findById(commentId);

    if (!comment) {
      res.status(404).send({ error: "Sorry, comment not found !" });

      return;
    }

    const updatedComment = await Comment.query().patchAndFetchById(commentId, {
      content,
      updatedAt,
    });

    res.send(updatedComment);
  });

  app.put("/comments/:id", async (req, res) => {
    const { id: commentId } = req.params;

    const { content, updatedAt } = req.body;

    const comment = await Comment.query().findById(commentId);

    if (!comment) {
      res.status(404).send({ error: "Sorry, comment not found !" });

      return;
    }

    await comment
      .$query()
      .update({
        content,
        updatedAt,
      })
      .where("id", commentId);

    res.send(comment);
  });

  app.delete("/comments/:id", async (req, res) => {
    const { id: commentId } = req.params;

    const comment = await Comment.query().findById(commentId);

    if (!comment) {
      res.status(404).send({ error: "Sorry, comment not found !" });

      return;
    }

    await Comment.query().deleteById(commentId);

    res.send(comment);
  });
};

export default commentsRoutes;
