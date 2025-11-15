import * as Yup from 'yup';
import { CustomError } from '../utils/customError.js';
import { TopicService } from '../services/topic.service.js';
import { CreateTeamSchema } from '../utils/validations/team.validation.js';


export const TopicController = {
  createTopic: async (req, res, _next) => {
    try {
      const { teamId } = req.params;
      const { title } = req.body;

      const topic = await TopicService.createTopic(req.user.id, teamId, title);

      res.status(201).json({
        success: true,
        message: "Topic successfully created",
        data: topic,
      });
    } catch (error) {
      _next(error);
    }
  },

  getTeamTopics: async (req, res, _next) => {
    try {
      const { teamId } = req.params;
      const topics = await TopicService.getTeamTopics(req.user.id, teamId);

      res.status(200).json({
        success: true,
        message: "Topics retrieved successfully",
        data: topics,
      });
    } catch (error) {
      _next(error);
    }
  },

  updateTopic: async (req, res, _next) => {
    try {
      const { topicId } = req.params;

      const updatedTopic = await TopicService.updateTopic(req.user.id, topicId, req.body);

      res.status(200).json({
        success: true,
        message: "Topic successfully updated",
        data: updatedTopic,
      });

    } catch (error) {
      _next(error);
    }
  },

  deleteTopic: async (req, res, _next) => {
    try {
      const { topicId } = req.params;

      const deletedTopic = await TopicService.deleteTopic(req.user.id, topicId);

      res.status(200).json({
        success: true,
        message: "Topic successfully deleted",
        data: deletedTopic,
      });

    } catch (error) {
      _next(error);
    }
  },

  // Subtopic
  createSubtopic: async (req, res, _next) => {
    try {
      const { topicId } = req.params;
      const { title } = req.body;

      const subtopic = await TopicService.createSubtopic(req.user.id, topicId, title);

      res.status(201).json({
        success: true,
        message: "Subtopic successfully created",
        data: subtopic,
      });
    } catch (error) {
      _next(error);
    }
  },

  getSubtopics: async (req, res, _next) => {
    try {

    } catch (error) {
      _next(error);
    }
  }

};