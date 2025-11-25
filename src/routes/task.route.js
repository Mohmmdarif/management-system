import express from "express";
import { verifyToken } from "../middlewares/auth.middleware.js";
import { TaskController } from "../controllers/task.controller.js";
import { rbacTeam, TeamRoleAccess } from "../middlewares/rbac.middleware.js";

const router = express.Router();

router.post(
  "/:teamId/subtopics/:subtopicId/tasks",
  verifyToken,
  rbacTeam([TeamRoleAccess.MANAGER]),
  TaskController.createTask
);
router.get(
  "/:teamId/subtopics/:subtopicId/tasks",
  verifyToken,
  TaskController.getTasksBySubtopic
);
router.get("/:teamId/task/:taskId", verifyToken, TaskController.getTaskById);
router.put(
  "/:teamId/task/:taskId/",
  verifyToken,
  rbacTeam([TeamRoleAccess.MANAGER]),
  TaskController.updateTask
);
router.delete(
  "/:teamId/task/:taskId",
  verifyToken,
  rbacTeam([TeamRoleAccess.MANAGER]),
  TaskController.deleteTask
);

router.put(
  "/:teamId/task/:taskId/status",
  verifyToken,
  rbacTeam([TeamRoleAccess.MANAGER, TeamRoleAccess.STAFF]),
  TaskController.updateTaskStatus
);
router.put(
  "/:teamId/task/:taskId/progress",
  verifyToken,
  rbacTeam([TeamRoleAccess.STAFF]),
  TaskController.updateTaskProgress
);

export default router;
