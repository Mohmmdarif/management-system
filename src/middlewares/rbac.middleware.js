import { CustomError } from "../utils/customError";

export const RoleAccess = Object.freeze({
  ADMIN: "ADMIN",
  MEMBER: "MEMBER",
  GUEST: "GUEST",
});

/**
 * Middleware for global role-based access
 * Example usage: router.post('/admin', auth, rbacGlobal(['ADMIN']), handler)
 */
export const rbacGlobal = (allowedRoles = []) => {
  return (req, _res, next) => {
    if (!req.user) return next(new CustomError(401, "Unauthorized: No user data"));

    const userRole = req.user.role; // from JWT or Prisma
    if (!allowedRoles.includes(userRole)) {
      return next(new CustomError(403, "Forbidden: Access denied"));
    }

    next();
  };
};


export const TeamRoleAccess = Object.freeze({
  OWNER: "OWNER",
  ADMIN: "ADMIN",
  MEMBER: "MEMBER",
});

/**
 * Check user’s role in a specific team
 * Must include :teamId in route params or pass teamId via req.body
 * Example usage:
 * router.put('/teams/:teamId/update', auth, rbacTeam(['OWNER','ADMIN']), updateTeam)
 */
export const rbacTeam = (allowedRoles = []) => {
  return async (req, _res, next) => {
    const { teamId } = req.params;
    if (!req.user) return next(new CustomError(401, "Unauthorized"));
    if (!teamId) return next(new CustomError(400, "teamId not provided"));

    // Check user’s role inside that team
    const membership = await prisma.userTeam.findFirst({
      where: { userId: req.user.id, teamId },
    });

    if (!membership) {
      return next(new CustomError(403, "You are not a member of this team"));
    }

    if (!allowedRoles.includes(membership.role)) {
      return next(
        new CustomError(403, "You don't have permission for this action")
      );
    }

    next();
  };
};
