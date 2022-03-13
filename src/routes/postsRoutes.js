const postsRoutes = (app) => {
  app.get("/posts", async (req, res) => {
    res.send("All posts");
  });
};

export default postsRoutes;
