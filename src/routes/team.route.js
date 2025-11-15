import express from 'express';
import { verifyToken } from "../middlewares/auth.middleware.js";
// import rbacMiddleware, { UserRole } from "../middlewares/rbac.middleware";
import { TeamController } from '../controllers/team.controller.js';

const router = express.Router();

router.post("/create", verifyToken, TeamController.createTeam);
router.get("/", verifyToken, TeamController.getMyTeams);
router.get("/:teamId/details", verifyToken, TeamController.getTeamDetails);
router.put("/:teamId/update", verifyToken, TeamController.updateTeam);
router.delete("/:teamId/delete", verifyToken, TeamController.deleteTeam);

export default router;