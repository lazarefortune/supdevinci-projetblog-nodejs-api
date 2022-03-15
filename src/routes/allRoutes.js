import productsRoutes from "./posts.js";
import usersRoutes from "./users.js";

const allRoutes = (app) => {
  usersRoutes(app);
  productsRoutes(app);
};

export default allRoutes;
