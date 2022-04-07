import commentsRoutes from "./comments.js";
import productsRoutes from "./posts.js";
import rolesRoutes from "./roles.js";

const allRoutes = (app) => {
  productsRoutes(app);
  commentsRoutes(app);
  rolesRoutes(app);
};

export default allRoutes;
