import express from "express";
import {
  getAllRoles,
  getRole,
  createRole,
  deleteRole,
  updatedRole,
} from "../controllers/role.controller.js";

const router = express.Router();

router.get("/", getAllRoles);
router.get("/:id", getRole);
router.put("/:id", updatedRole);
router.patch("/:id", updatedRole);
router.post("/", createRole);
router.delete("/:id", deleteRole);

export default router;
