import { CustomError } from "../utils/customError.js";
import prisma from "../db/index.js";

export const TeamRoleAccess = Object.freeze({
  MANAGER: "MANAGER",
  STAFF: "STAFF",
});

/**
 * Check user’s role in a specific team
 * Must include :teamId in route params or pass teamId via req.body
 * Example usage:
 * router.put('/teams/:teamId/update', auth, rbacTeam(['OWNER','ADMIN']), updateTeam)
 */
export const rbacTeam = (allowedRoles = []) => {
  return async (req, _res, next) => {
    try {
      let { teamId, topicId, subtopicId } = req.params;
      if (!teamId) {
        // Ambil dari body kalau dikirim
        if (req.body && req.body.teamId) {
          teamId = req.body.teamId;
        }
      }
      // Resolve via topicId
      if (!teamId && topicId) {
        const topic = await prisma.topic.findUnique({
          where: { id: topicId },
          select: { teamId: true },
        });
        teamId = topic?.teamId;
      }
      // Resolve via subtopicId
      if (!teamId && subtopicId) {
        const subtopic = await prisma.subtopic.findUnique({
          where: { id: subtopicId },
          select: { topic: { select: { teamId: true } } },
        });
        teamId = subtopic?.topic?.teamId;
      }

      if (!req.user) return next(new CustomError(401, "Unauthorized"));
      if (!teamId) return next(new CustomError(400, "teamId not provided"));

      const membership = await prisma.userTeam.findFirst({
        where: { userId: req.user.id, teamId },
      });
      if (!membership)
        return next(new CustomError(403, "You are not a member of this team"));

      if (allowedRoles.length && !allowedRoles.includes(membership.role)) {
        return next(
          new CustomError(403, "You don't have permission for this action")
        );
      }

      // Simpan teamId ter-resolve untuk handler berikutnya jika perlu
      req.teamId = teamId;
      next();
    } catch (err) {
      next(err);
    }
  };
};

