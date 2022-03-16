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
    res.send("All posts");
  });
};

export default postsRoutes;
