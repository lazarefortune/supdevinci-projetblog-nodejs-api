const usersRoutes = (app) => {
  app.get("/users", async (req, res) => {
    res.send("ALl users");
  });
};

export default usersRoutes;
