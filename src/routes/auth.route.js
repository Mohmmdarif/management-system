import express from "express";
import { AuthController } from "../controllers/auth.controller.js";
import { verifyToken } from "../middlewares/auth.middleware.js";
// import rbacMiddleware, { UserRole } from "../middlewares/rbac.middleware";

const router = express.Router();

router.post(
  "/register",
  // verifyToken,
  // rbacMiddleware([UserRole.KoordinatorTU]),
  AuthController.Register
);
router.post("/login", AuthController.Login);

export default router;