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

const router = express.Router();

router.get("/", getAllUsers);
router.post("/login", signInUser);
router.post("/register", createUser);
router.delete("/:id", deleteUser);

// Auth routes
router.use([auth, ownUserAccess]);

router.get("/:id", getUser);
router.put("/:id", updateUser);
router.patch("/:id", updateUser);
router.put("/:id/password/update", updateUserPassword);

// Other routes
router.get("/:id/posts", allUserPosts);
router.get("/:id/comments", allUserComments);

export default router;
