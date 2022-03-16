import User from "../db/models/User.js";

const usersRoutes = (app) => {
  app.get("/users", async (req, res) => {
    res.send("ALl users");
  });

  /**
   * @swagger
   * /users:
   *  get:
   *    description: Use to request all users
   *    responses:
   *      '200':
   *          description: A successful response
   */
  app.get("/users", async (req, res) => {
    await User.query().then((users) => {
      res.send(users);
    });
  });

  app.get("/users/:id", async (req, res) => {
    const { id: userId } = req.params;

    const user = await User.query().findById(userId);

    if (!user) {
      res.status(404).send({ error: "Sorry, User not found !" });

      return;
    }

    res.send(user);
  });
};

export default usersRoutes;
