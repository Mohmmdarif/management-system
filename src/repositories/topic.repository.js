import prisma from "../db/index.js";

export const TopicRepository = {
  Create: async (payload) => {
    const createdTopic = await prisma.topic.create({
      data: payload,
    });
    return createdTopic;
  },
};