import * as Yup from 'yup';
import { CustomError } from '../utils/customError.js';
import { TaskService } from '../services/task.service.js';

export const TaskController = {
  createTask: async (req, res, _next) => {
    try {
      const { subtopicId } = req.params;

      const task = await TaskService.createTask(req.user.id, subtopicId, req.body);

      res.status(201).json({
        success: true,
        message: "Task successfully created",
        data: task,
      });
    } catch (error) {
      _next(error);
    }
  }
};