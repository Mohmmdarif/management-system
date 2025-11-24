import { TeamRepository } from "../repositories/team.repository.js";
import { TopicRepository } from "../repositories/topic.repository.js";
import { CustomError } from "../utils/customError.js";

export const TopicService = {
  createTopic: async (teamId, title) => {
    const topic = await TopicRepository.Create({
      title, teamId,
    });

    return topic;
  },

  getTeamTopics: async (teamId) => {
    const topics = await TopicRepository.GetTopicsByTeam(teamId);

    return topics;
  },

  updateTopic: async (topicId, data) => {
    const topic = await TopicRepository.GetById(topicId);
    if (!topic) throw new CustomError(404, "Topic not found");

    const updatedTopic = await TopicRepository.Update(topicId, data);

    return updatedTopic;
  },

  deleteTopic: async (topicId) => {
    const topic = await TopicRepository.GetById(topicId);
    if (!topic) throw new CustomError(404, "Topic not found");

    return await TopicRepository.Delete(topicId);
  },

  // Subtopic
  createSubtopic: async (topicId, payload) => {
    const topic = await TopicRepository.GetById(topicId);
    if (!topic) throw new CustomError(404, "Topic not found");

    const subtopic = await TopicRepository.CreateSubtopic(topicId, payload);

    return subtopic;
  },

  getSubtopics: async (topicId) => {
    const topic = await TopicRepository.GetById(topicId);
    if (!topic) throw new CustomError(404, "Topic not found");

    const subtopics = await TopicRepository.GetSubtopicsByTopic(topicId);

    return subtopics;
  },

  updateSubtopic: async (subtopicId, data) => {
    const subtopic = await TopicRepository.GetSubtopicById(subtopicId);
    if (!subtopic) throw new CustomError(404, "Subtopic not found");

    const updatedSubtopic = await TopicRepository.UpdateSubtopic(subtopicId, data);

    return updatedSubtopic;
  },

  deleteSubtopic: async (subtopicId) => {
    const subtopic = await TopicRepository.GetSubtopicById(subtopicId);
    if (!subtopic) throw new CustomError(404, "Subtopic not found");

    return await TopicRepository.DeleteSubtopic(subtopicId);
  },
};