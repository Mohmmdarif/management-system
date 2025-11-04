import prisma from "../db/index.js";

export const AuthRepository = {
  Create: async (payload) => {
    const user = await prisma.user.create({
      data: payload,
    });

    return user;
  },

  FindByEmail: async (email) => {
    const user = await prisma.user.findUnique({
      where: {
        email,
      },
    });

    return user;
  },
};