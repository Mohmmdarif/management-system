import prisma from "../db/index.js";

export const TeamRepository = {
  Create: async (payload) => {
    const { name, description, ownerId } = payload;
    const team = await prisma.team.create({
      data: {
        name,
        description,
        members: {
          create: {
            role: "MANAGER",
            user: {
              connect: {
                id: ownerId
              }
            }
          },
        },
      },
      include: { members: true },
    });
    return team;
  },

  GetTeamsByUser: (userId) => {
    return prisma.userTeam.findMany({
      where: { userId },
      include: { team: true },
    });
  },

  GetTeamById: async (teamId) => {
    return prisma.team.findUnique({
      where: { id: teamId },
      include: {
        members: {
          include: {
            user: {
              select: {
                id: true,
                email: true,
                username: true,
                name: true,
                avatarUrl: true,
                createdAt: true,
                updatedAt: true
              }
            }
          }
        }
      },
    });
  },

  Update: async (teamId, data) => {
    return prisma.team.update({ where: { id: teamId }, data });
  },

  Delete: async (teamId) => {
    return prisma.team.delete({ where: { id: teamId } });
  },

  IsMember: async (teamId, userId) => {
    const membership = await prisma.userTeam.findFirst({
      where: { teamId, userId },
      select: { id: true },
    });
    return !!membership;
  },
};