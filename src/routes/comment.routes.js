import express from "express";
import {
  getAllComments,
  getComment,
  createComment,
  deleteComment,
  updatedComment,
} from "../controllers/comment.controller.js";

const router = express.Router();

router.get("/", getAllComments);
router.get("/:id", getComment);
router.put("/:id", updatedComment);
router.patch("/:id", updatedComment);
router.post("/", createComment);
router.delete("/:id", deleteComment);

export default router;
