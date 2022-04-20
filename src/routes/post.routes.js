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
  getPostWithoutAuth,
  getAllPostCommentsWithoutAuth,
} from "../controllers/post.controller.js";
import auth from "../middlewares/auth.middleware.js";

const router = express.Router();

router.get("/public", getAllPostsWithoutAuth);
router.get("/public/:id", getPostWithoutAuth);
router.get("/public/:id/comments", getAllPostCommentsWithoutAuth);

// router.use([auth]);

router.get("/admin", auth, getAllPostsAsAdmin);
router.get("/", auth, getAllPosts);

router.get("/:id", auth, getPost);
router.get("/:id/comments", auth, getAllPostComments);

router.post("/", auth, createPost);

router.put("/:id", auth, updatedPost);
router.patch("/:id", auth, updatedPost);

router.delete("/:id", auth, deletePost);

export default router;
