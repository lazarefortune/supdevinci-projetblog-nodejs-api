import express from "express";
import {
  getAllPosts,
  getPost,
  createPost,
  deletePost,
  updatedPost,
} from "../controllers/post.controller.js";

const router = express.Router();

router.get("/", getAllPosts);
router.get("/:id", getPost);
router.put("/:id", updatedPost);
router.patch("/:id", updatedPost);
router.post("/", createPost);
router.delete("/:id", deletePost);

export default router;
