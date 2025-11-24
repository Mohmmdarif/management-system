import prisma from "../db/index.js";

export const TaskRepository = {
  Create: async (payload) => {
    const task = await prisma.task.create({
      data: payload,
    });
    return task;
  },
};