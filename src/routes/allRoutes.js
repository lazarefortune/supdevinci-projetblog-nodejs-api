import commentsRoutes from "./comments.js";
import productsRoutes from "./posts.js";
import usersRoutes from "./users.js";

const allRoutes = (app) => {
  usersRoutes(app);
  productsRoutes(app);
  commentsRoutes(app);
};

export default allRoutes;
