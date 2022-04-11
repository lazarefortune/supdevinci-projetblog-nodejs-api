import express from "express";
import {
  getAllUsers,
  getUser,
  signInUser,
  createUser,
  deleteUser,
  updateUser,
  allUserPosts,
  allUserComments,
  updateUserPassword,
} from "../controllers/user.controller.js";
import auth from "../middlewares/auth.middleware.js";
import ownUserAccess from "../middlewares/ownAccess.middleware.js";
import authUser from "../middlewares/authUser.middleware.js";

const router = express.Router();

router.post("/login", signInUser);
router.post("/register", createUser);

// Auth routes
router.use([auth, ownUserAccess]);

router.get("/", getAllUsers);
router.get("/:id", authUser(["admin", "user"]), getUser);
router.put("/:id", updateUser);
router.patch("/:id", updateUser);
router.put("/:id/password/update", updateUserPassword);
router.delete("/:id", deleteUser);

// Other routes
router.get("/:id/posts", allUserPosts);
router.get("/:id/comments", allUserComments);

export default router;
