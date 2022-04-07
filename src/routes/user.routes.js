import express from "express";
import {
  getAllUsers,
  getUser,
  createUser,
  deleteUser,
  updatedUser,
  allUserPosts,
  allUserComments,
} from "../controllers/user.controller.js";

const router = express.Router();

router.get("/", getAllUsers);
router.get("/:id", getUser);
router.put("/:id", updatedUser);
router.patch("/:id", updatedUser);
router.post("/", createUser);
router.delete("/:id", deleteUser);
// Other routes
router.get("/:id/posts", allUserPosts);
router.get("/:id/comments", allUserComments);

export default router;
