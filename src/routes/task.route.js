import express from 'express';
import { verifyToken } from "../middlewares/auth.middleware.js";
import { TaskController } from '../controllers/task.controller.js';
import { rbacTeam, TeamRoleAccess } from "../middlewares/rbac.middleware.js";


const router = express.Router();

router.post("/:teamId/subtopics/:subtopicId/tasks", verifyToken, rbacTeam([TeamRoleAccess.MANAGER]), TaskController.createTask);


export default router;