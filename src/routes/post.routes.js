import express from "express";
import {
  getAllPosts,
  getPost,
  createPost,
  deletePost,
  updatedPost,
  getAllPostComments,
  getAllPostsAsAdmin,
  getAllPostsWithoutAuth,
} from "../controllers/post.controller.js";
import auth from "../middlewares/auth.middleware.js";

const router = express.Router();

router.get("/public", getAllPostsWithoutAuth);

router.use([auth]);

router.get("/admin", getAllPostsAsAdmin);
router.get("/", getAllPosts);

router.get("/:id", getPost);
router.get("/:id/comments", getAllPostComments);

router.post("/", createPost);

router.put("/:id", updatedPost);
router.patch("/:id", updatedPost);

router.delete("/:id", deletePost);

export default router;
