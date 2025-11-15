import express from 'express';
import { verifyToken } from "../middlewares/auth.middleware.js";
// import rbacMiddleware, { UserRole } from "../middlewares/rbac.middleware";
import { TopicController } from '../controllers/topic.controller.js';
import { rbacTeam } from '../middlewares/rbac.middleware.js';

const router = express.Router();

// Topic
router.post("/:teamId/create", verifyToken, TopicController.createTopic);
router.get("/:teamId", verifyToken, TopicController.getTeamTopics);
router.put("/:topicId/update", verifyToken, TopicController.updateTopic);
router.delete("/:topicId/delete", verifyToken, TopicController.deleteTopic);

// Subtopic
router.post("/:topicId/subtopic/create", verifyToken, TopicController.createSubtopic);
router.get("/:topicId/subtopics", verifyToken, TopicController.getSubtopics);

export default router;