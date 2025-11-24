import { TaskRepository } from "../repositories/task.repository.js";
import { TeamRepository } from "../repositories/team.repository.js";
import { TopicRepository } from "../repositories/topic.repository.js";
import { CustomError } from "../utils/customError.js";


export const TaskService = {
  createTask: async (ownerId, subtopicId, payload) => {
    const { title, description, priority, dueDate, assigneeId } = payload;

    const subtopic = await TopicRepository.GetSubtopicById(subtopicId);
    if (!subtopic) throw new CustomError(404, "Subtopic not found");

    const teamId = subtopic.topic?.teamId;

    const isMember = await TeamRepository.IsMember(teamId, assigneeId);
    if (!isMember) throw new CustomError(400, "Assignee must be a member of the team");

    if (assigneeId === ownerId) throw new CustomError(400, "Manager cannot assign task to themselves");

    const task = await TaskRepository.Create({
      title,
      description,
      priority,
      dueDate,
      assigneeId,
      ownerId,
      subtopicId,
    });

    return task;
  },
};