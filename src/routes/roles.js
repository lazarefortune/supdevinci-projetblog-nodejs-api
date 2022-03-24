import Role from "../db/models/Role.js";

const rolesRoutes = (app) => {
  app.get("/roles", async (req, res) => {
    await Role.query().then((roles) => {
      res.send(roles);
    });
  });

  app.post("/roles", async (req, res) => {
    const { name, orderPriority } = req.body;

    const role = await Role.query().findOne({ name });

    if (role) {
      res.status(409).send({ error: "Ce role existe déjà" });

      return;
    }

    await Role.query()
      .insert({
        name,
        orderPriority,
      })
      .then((role) => {
        res.status(201).send(role);
      });
  });

  // TODO: PUT à revoir
  app.put("/roles/:id", async (req, res) => {
    const { id: roleId } = req.params;
    const { name, orderPriority } = req.body;

    const role = await Role.query().findById(roleId);

    if (!role) {
      res.status(404).send({ error: "Sorry, Role not found !" });

      return;
    }

    const errors = [];

    if (name) {
      const existRoleName = await Role.query().findOne({ name });
      if (existRoleName && existRoleName.id !== Number(roleId)) {
        errors.push("Sorry, role name already exist !");
      }
    }

    // TODO: orderPriority doit être positif
    if (orderPriority) {
      const existRoleOrder = await Role.query().findOne({ orderPriority });
      if (existRoleOrder && existRoleOrder.id !== Number(roleId)) {
        errors.push("Sorry, role order already exist !");
      }
    }

    if (errors && errors.length > 0) {
      res.send(errors);

      return;
    }

    await role
      .$query()
      .update({
        name,
        orderPriority,
      })
      .where("id", roleId);

    res.send(role);
  });

  // TODO: PATCH à implémenter
  app.patch("/roles/:id", (req, res) => {
    const { id: roleId } = req.params;

    res.send({ message: "OK" });
  });

  app.delete("/roles/:id", async (req, res) => {
    const { id: roleId } = req.params;

    const role = await Role.query().findById(roleId);

    if (!role) {
      res.status(404).send({ error: "Sorry, Role not found !" });

      return;
    }

    await role.$query().delete();
    res.send(role);
  });
};

export default rolesRoutes;
