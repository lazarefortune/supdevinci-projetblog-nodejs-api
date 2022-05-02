import express from "express"
import * as userController from "../controllers/user.controller.js"
import auth from "../middlewares/auth.middleware.js"
import isGranted from "../middlewares/role.middleware.js"

const router = express.Router()

router.post("/login", userController.signInUser)
router.post("/register", userController.createUser)

router.get("/", auth, userController.getAllUsers)
router.get("/:id", auth, userController.getUser)
router.put("/:id", auth, userController.updateUser)
router.patch("/:id", auth, userController.updateUser)
router.put("/:id/password", auth, userController.updateUserPassword)
router.put(
  "/:id/account/status",
  auth,
  isGranted(["admin"]),
  userController.updateUserAccountStatus
)
router.put(
  "/:id/role",
  auth,
  isGranted(["admin"]),
  userController.updateUserRole
)

router.delete("/:id", auth, userController.deleteUser)

// Other routes
router.get("/:id/posts", userController.allUserPosts)

// ADMIN
router.get(
  "/:id/posts/admin",
  auth,
  isGranted("admin"),
  userController.allUserPostsAsAdmin
)
router.get(
  "/:id/comments/admin",
  auth,
  isGranted(["admin"]),
  userController.allUserComments
)

export default router
