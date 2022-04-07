import commentsRoutes from "./comments.js";
import rolesRoutes from "./roles.js";

const allRoutes = (app) => {
  commentsRoutes(app);
  rolesRoutes(app);
};

export default allRoutes;
