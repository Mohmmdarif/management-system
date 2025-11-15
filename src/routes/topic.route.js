import express from 'express';
import { verifyToken } from "../middlewares/auth.middleware.js";
// import rbacMiddleware, { UserRole } from "../middlewares/rbac.middleware";
import { TopicController } from '../controllers/topic.controller.js';

const router = express.Router();

router.post("/:teamId/create-topic", verifyToken, TopicController.createTopic);

export default router;