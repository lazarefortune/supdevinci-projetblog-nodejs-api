import Post from "../db/models/Post.js";
import User from "../db/models/User.js";

const postsRoutes = (app) => {
  /**
   * @swagger
   * /posts:
   *  get:
   *    description: Use to request all posts
   *    responses:
   *      '200':
   *          description: A successful response
   *      '500':
   *          description: Error internal server
   */
  app.get("/posts", async (req, res) => {
    const { page, limit } = req.query;

    if (limit) {
      const posts = await Post.query().withGraphFetched("author").limit(limit);
      res.send(posts);

      return;
    }

    await Post.query()
      .withGraphFetched("author")
      .then((posts) => {
        res.send(posts);
      });
  });

  app.get("/posts/:id", async (req, res) => {
    const { id: postId } = req.params;

    const post = await Post.query().withGraphFetched("author").findById(postId);

    if (!post) {
      res.status(404).send({ error: "Sorry, Post not found !" });

      return;
    }

    res.send(post);
  });

  app.post("/posts", async (req, res) => {
    const { title, content, isPublished, createdAt, updatedAt, authorId } =
      req.body;

    const post = await Post.query().findOne({ title });
    if (post) {
      res.status(409).send({ error: "Sorry, Post already exists !" });

      return;
    }

    const user = await User.query().findById(authorId);

    console.log(user);
    if (!user) {
      res.status(404).send({ error: "Sorry, user not found !" });

      return;
    }

    try {
      Post.query()
        .insert({ title, content, isPublished, createdAt, updatedAt, authorId })
        .then((post) => {
          res.send(post);
        });
    } catch (error) {
      res.status(500).send({ error: "Sorry, error internal server !" });
    }
  });

  app.put("/posts/:id", async (req, res) => {
    const {
      params: { id: postId },
      body: { title, content, updatedAt, isPublished },
    } = req;

    const post = await Post.query().findById(postId);

    if (!post) {
      res.status(404).send({ error: "Sorry, post not found !" });

      return;
    }

    const samePost = await Post.query().findOne({ title });

    if (samePost && samePost.id !== Number(postId)) {
      res.status(409).send({ error: "Sorry, post title already exist !" });

      return;
    }

    try {
      await post
        .$query()
        .update({
          title,
          content,
          updatedAt,
          isPublished,
        })
        .where("id", postId);
    } catch (error) {
      res.status(500).send({ error: "Sorry, error internal server !" });

      return;
    }

    res.send(post);
  });

  app.delete("/posts/:id", async (req, res) => {
    const { id: postId } = req.params;

    const post = await Post.query().findById(postId);

    if (!post) {
      res.status(404).send({ error: "Sorry, Post not found !" });

      return;
    }

    await post.$query().delete();
    res.send(post);
  });
};

export default postsRoutes;
