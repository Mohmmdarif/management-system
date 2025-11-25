import express from "express";
import { verifyToken } from "../middlewares/auth.middleware.js";
import { DocumentController } from "../controllers/document.controller.js";
import { rbacTeam, TeamRoleAccess } from "../middlewares/rbac.middleware.js";
import uploadMiddleware from "../middlewares/upload.middleware.js";

const router = express.Router();

router.post(
  "/:teamId/task/:taskId/documents",
  verifyToken,
  rbacTeam([TeamRoleAccess.MANAGER, TeamRoleAccess.STAFF]),
  uploadMiddleware.single,
  DocumentController.uploadDocument
);

router.get(
  "/:teamId/task/:taskId/documents",
  verifyToken,
  rbacTeam([TeamRoleAccess.MANAGER, TeamRoleAccess.STAFF]),
  DocumentController.listDocument
);

router.delete(
  "/:teamId/task/:taskId/documents/:docId",
  verifyToken,
  rbacTeam([TeamRoleAccess.MANAGER, TeamRoleAccess.STAFF]),
  DocumentController.deleteDocument
);

export default router;