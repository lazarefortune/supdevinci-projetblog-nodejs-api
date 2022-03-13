import productsRoutes from "./postsRoutes.js";
import usersRoutes from "./usersRoutes.js";

const allRoutes = (app) => {
  usersRoutes(app);
  productsRoutes(app);
};

export default allRoutes;
