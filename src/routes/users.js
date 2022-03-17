import User from "../db/models/User.js";
import hashPassword from "../security/password/hashPassword.js";

const usersRoutes = (app) => {
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

  /**
   * @swagger
   * /users/{id}:
   *  get:
   *    description: Use to request one user
   *    produces:
   *      - application/json
   *    parameters:
   *      - in: path
   *        name: id
   *        value: 2
   *        schema:
   *          type: integer
   *        required: true
   *    responses:
   *      '200':
   *          description: A successful response
   *      '404':
   *          description: User not found
   *      '500':
   *          description: Server error
   */
  app.get("/users/:id", async (req, res) => {
    const { id: userId } = req.params;

    const user = await User.query().findById(userId);

    if (!user) {
      res.status(404).send({ error: "Sorry, User not found !" });

      return;
    }

    res.send(user);
  });

  app.post("/register", async (req, res) => {
    const {
      firstName,
      lastName,
      displayName,
      email,
      password,
      createdAt,
      updatedAt,
    } = req.body;

    const user = await User.query().findOne({ email });

    if (user) {
      res.status(409).send("User already exists");

      return;
    }

    const [passwordHash, passwordSalt] = hashPassword(password);

    User.query()
      .insert({
        firstName,
        lastName,
        displayName,
        email,
        createdAt,
        updatedAt,
        passwordHash,
        passwordSalt,
      })
      .then((user) => {
        res.send(user);
      });
  });

  app.put("/users/:id", async (req, res) => {
    const { id } = req.params;
    const { firstName, lastName, displayName, email, password, updatedAt } =
      req.body;

    const user = await User.query().findById(id);
    if (!user) {
      res.status(404).send("User not found");

      return;
    }

    const [passwordHash, passwordSalt] = hashPassword(password);

    await user
      .$query()
      .update({
        firstName,
        lastName,
        displayName,
        email,
        passwordHash,
        passwordSalt,
        updatedAt,
      })
      .where("id", id);

    res.send(user);
  });

  /**
   * @swagger
   * /users/{id}:
   *  delete:
   *    description: Use to delete one user
   *    produces:
   *      - application/json
   *    parameters:
   *      - in: path
   *        name: id
   *        value: 12
   *        schema:
   *          type: integer
   *        required: true
   *    responses:
   *      '200':
   *          description: A successful response
   *      '404':
   *          description: User not found
   *      '500':
   *          description: Server error
   */
  app.delete("/users/:id", async (req, res) => {
    const { id } = req.params;

    const user = await User.query().findById(id);
    if (!user) {
      res.status(404).send("User not found");

      return;
    }

    await user.$query().delete();
    res.send(user);
  });
};

export default usersRoutes;
