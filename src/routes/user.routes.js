import express from "express";
import * as userController from "../controllers/user.controller.js";
import auth from "../middlewares/auth.middleware.js";
import isGranted from "../middlewares/role.middleware.js";
const router = express.Router();

router.post("/login", userController.signInUser);
router.post("/register", userController.createUser);

// Auth routes
// router.use([auth]);

router.get("/", auth, userController.getAllUsers);
router.get("/:id", auth, userController.getUser);
// router.put("/:id", auth, userController.updateUser);
router.patch("/:id", auth, userController.updateUser);
router.put("/:id/password/update", auth, userController.updateUserPassword);
router.patch(
  "/:id/account/status",
  auth,
  isGranted(["admin"]),
  userController.updateUserAccountStatus
);

router.delete("/:id", auth, userController.deleteUser);

// Other routes
router.get("/:id/posts", auth, userController.allUserPosts);
router.get("/:id/comments", auth, userController.allUserComments);

// ADMIN
router.get(
  "/:id/posts/admin",
  auth,
  isGranted("admin"),
  userController.allUserPostsAsAdmin
);

export default router;
