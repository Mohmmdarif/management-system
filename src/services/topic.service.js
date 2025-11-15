import { TeamRepository } from "../repositories/team.repository.js";
import { TopicRepository } from "../repositories/topic.repository.js";
import { CustomError } from "../utils/customError.js";

export const TopicService = {
  createTopic: async (userId, teamId, title) => {
    const membership = await TeamRepository.FindMembership(teamId, userId);
    if (!membership) throw new CustomError(403, "You are not a member of this team");

    if (!["OWNER", "ADMIN"].includes(membership.role)) {
      throw new CustomError(403, "You are not allowed to perform this action");
    }

    const topic = await TopicRepository.Create({
      title, teamId,
    });

    return topic;
  },

  getTeamTopics: async (userId, teamId) => {
    const membership = await TeamRepository.FindMembership(teamId, userId);
    if (!membership) throw new CustomError(403, "You are not a member of this team");

    const topics = await TopicRepository.GetTopicsByTeam(teamId);

    return topics;
  },

  updateTopic: async (userId, topicId, data) => {
    const topic = await TopicRepository.GetById(topicId);
    if (!topic) throw new CustomError(404, "Topic not found");

    const membership = await TeamRepository.FindMembership(topic.teamId, userId);
    if (!membership) throw new CustomError(403, "You are not a member of this team");

    if (!["OWNER", "ADMIN"].includes(membership.role)) {
      throw new CustomError(403, "You are not allowed to perform this action");
    }

    const updatedTopic = await TopicRepository.Update(topicId, data);

    return updatedTopic;
  },

  deleteTopic: async (userId, topicId) => {
    const topic = await TopicRepository.GetById(topicId);
    if (!topic) throw new CustomError(404, "Topic not found");

    const membership = await TeamRepository.FindMembership(topic.teamId, userId);
    if (!membership) throw new CustomError(403, "You are not a member of this team");

    if (!["OWNER", "ADMIN"].includes(membership.role)) {
      throw new CustomError(403, "You are not allowed to perform this action");
    }

    return await TopicRepository.Delete(topicId);
  },

  // Subtopic
  createSubtopic: async (userId, topicId, title) => {
    const topic = await TopicRepository.GetById(topicId);
    if (!topic) throw new CustomError(404, "Topic not found");

    const membership = await TeamRepository.FindMembership(topic.teamId, userId);
    if (!membership) throw new CustomError(403, "You are not a member of this team");

    if (!["OWNER", "ADMIN"].includes(membership.role)) {
      throw new CustomError(403, "You are not allowed to perform this action");
    }

    const subtopic = await TopicRepository.CreateSubtopic({
      title, topicId,
    });

    return subtopic;
  },
};