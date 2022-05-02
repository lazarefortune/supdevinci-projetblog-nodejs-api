import express from "express"
import * as commentController from "../controllers/comment.controller.js"

import auth from "../middlewares/auth.middleware.js"

const router = express.Router()

router.use(auth)

router.get("/", commentController.getAllComments)
router.get("/:id", commentController.getComment)

router.put("/:id", commentController.updatedComment)
router.patch("/:id", commentController.updatedComment)

router.post("/", commentController.createComment)

router.delete("/:id", commentController.deleteComment)

export default router
