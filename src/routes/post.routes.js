import express from "express";
import {
  getAllPosts,
  getPost,
  createPost,
  deletePost,
  updatedPost,
  getAllPostComments,
  getAllPostsAsAdmin,
} from "../controllers/post.controller.js";
import auth from "../middlewares/auth.middleware.js";

const router = express.Router();

router.use([auth]);
router.post("/", createPost);
router.get("/admin", getAllPostsAsAdmin);
router.get("/", getAllPosts);
router.get("/:id", getPost);
router.get("/:id/comments", getAllPostComments);
router.put("/:id", updatedPost);
router.patch("/:id", updatedPost);
router.delete("/:id", deletePost);

export default router;
