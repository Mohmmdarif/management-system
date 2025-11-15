import prisma from "../db/index.js";

export const TopicRepository = {
  Create: async (payload) => {
    const createdTopic = await prisma.topic.create({
      data: payload,
    });
    return createdTopic;
  },

  GetTopicsByTeam: async (teamId) => {
    return await prisma.topic.findMany({
      where: { teamId },
    });
  },

  GetById: async (topicId) => {
    return await prisma.topic.findUnique({
      where: { id: topicId },
    });
  },

  Update: async (topicId, data) => {
    return await prisma.topic.update({
      where: { id: topicId },
      data,
    });
  },

  Delete: async (topicId) => {
    return await prisma.topic.delete({
      where: { id: topicId },
    });
  },

  // Subtopic
  CreateSubtopic: async (payload) => {
    const createdSubtopic = await prisma.subtopic.create({
      data: payload,
    });
    return createdSubtopic;
  },
};