import { handleUpload } from "../utils/cloudinary.js";
import { CommentRepository } from "../repositories/comment.repository.js";
import { CustomError } from "../utils/customError.js";
import { TaskRepository } from "../repositories/task.repository.js";
import { TeamRepository } from "../repositories/team.repository.js";

export const CommentService = {
  createComment: async (taskId, userId, body, parentId) => {
    const task = await TaskRepository.GetById(taskId);
    if (!task) throw new CustomError(404, "Task not found");

    const comment = await CommentRepository.Create({
      body,
      authorId: userId,
      taskId,
      parentId: parentId || null,
    });

    return comment;
  },

  getComments: async (taskId) => {
    const comments = await CommentRepository.FindByTask(taskId);
    return comments;
  },

  uploadAttachment: async (commentId, file) => {
    if (!file) throw new CustomError(400, "File required");

    const result = await handleUpload(file.buffer, file.originalname);

    const attachment = await CommentRepository.CreateAttachment({
      commentId,
      filename: file.originalname,
      url: result.secure_url,
      mimeType: file.mimetype,
      size: file.size,
    });

    return attachment;
  },

  deleteComment: async (commentId, userId, role) => {
    const comment = await CommentRepository.FindById(commentId);
    if (!comment) throw new CustomError(404, "Comment not found");

    if (comment.authorId !== userId && role !== "MANAGER") {
      throw new CustomError(403, "You don't have permission for this action");
    }

    const deletedComment = await CommentRepository.Delete(commentId);
    return deletedComment;
  },
};