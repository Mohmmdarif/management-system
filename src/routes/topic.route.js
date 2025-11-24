import express from 'express';
import { verifyToken } from "../middlewares/auth.middleware.js";
import { TopicController } from '../controllers/topic.controller.js';
import { rbacTeam, TeamRoleAccess } from "../middlewares/rbac.middleware.js";

const router = express.Router();

// Topic
router.post("/:teamId/topics", verifyToken, rbacTeam([TeamRoleAccess.MANAGER]), TopicController.createTopic);
router.get("/:teamId/topics", verifyToken, TopicController.getTeamTopics);
router.put("/topics/:topicId", verifyToken, rbacTeam([TeamRoleAccess.MANAGER]), TopicController.updateTopic);
router.delete("/topics/:topicId", verifyToken, rbacTeam([TeamRoleAccess.MANAGER]), TopicController.deleteTopic);

// Subtopic
router.post("/topics/:topicId/subtopics", verifyToken, rbacTeam([TeamRoleAccess.MANAGER]), TopicController.createSubtopic);
router.get("/topics/:topicId/subtopics", verifyToken, TopicController.getSubtopics);
router.put("/subtopics/:subtopicId", verifyToken, rbacTeam([TeamRoleAccess.MANAGER]), TopicController.updateSubtopic);
router.delete("/subtopics/:subtopicId", verifyToken, rbacTeam([TeamRoleAccess.MANAGER]), TopicController.deleteSubtopic);

export default router;