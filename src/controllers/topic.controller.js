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
};