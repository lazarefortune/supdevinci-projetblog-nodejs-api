import express from "express";
import * as postController from "../controllers/post.controller.js";
import auth from "../middlewares/auth.middleware.js";
import isGranted from "../middlewares/role.middleware.js";

const router = express.Router();

// router.use([auth]);

router.get(
  "/admin",
  auth,
  isGranted(["admin"]),
  postController.getAllPostsAsAdmin
);
router.get("/", postController.getAllPosts);

router.get("/:id", auth, postController.getPost);
router.get("/:id/comments", auth, postController.getAllPostComments);

router.post(
  "/",
  auth,
  isGranted(["admin", "author"]),
  postController.createPost
);

router.put(
  "/:id",
  auth,
  isGranted(["admin", "author"]),
  postController.updatedPost
);
router.patch(
  "/:id",
  auth,
  isGranted(["admin", "author"]),
  postController.updatedPost
);

router.delete(
  "/:id",
  auth,
  isGranted(["admin", "author"]),
  postController.deletePost
);

// Other routes
router.post("/search", postController.searchPosts);

export default router;
