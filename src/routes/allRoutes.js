import commentsRoutes from "./comments.js";
import productsRoutes from "./posts.js";
import rolesRoutes from "./roles.js";
import usersRoutes from "./users.js";

const allRoutes = (app) => {
  usersRoutes(app);
  productsRoutes(app);
  commentsRoutes(app);
  rolesRoutes(app);
};

export default allRoutes;
