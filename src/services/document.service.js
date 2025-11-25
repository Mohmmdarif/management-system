import { DocumentRepository } from "../repositories/document.repository.js";
import { TaskRepository } from "../repositories/task.repository.js";
import { TeamRepository } from "../repositories/team.repository.js";
import { handleUpload } from "../utils/cloudinary.js";
import { CustomError } from "../utils/customError.js";


export const DocumentService = {
  uploadDocument: async (uploaderId, teamId, taskId, file) => {
    if (!file) throw new CustomError(400, "No file uploaded");

    const task = await TaskRepository.GetById(taskId);
    if (!task) throw new CustomError(404, "Task not found");

    const isMember = await TeamRepository.IsMember(teamId, uploaderId);
    if (!isMember) throw new CustomError(403, "User is not a member of the team");

    const uploadResult = await handleUpload(file.buffer, file.originalname);

    const document = await DocumentRepository.Upload(
      taskId,
      uploadResult,
      uploaderId,
      file.originalname
    );

    return document;
  },

  listDocument: async (userId, teamId, taskId) => {
    const task = await TaskRepository.GetById(taskId);
    if (!task) throw new CustomError(404, "Task not found");

    const isMember = await TeamRepository.IsMember(teamId, userId);
    if (!isMember) throw new CustomError(403, "User is not a member of the team");

    const documents = await DocumentRepository.ListByTask(taskId);

    return documents;
  },

  deleteDocument: async (userId, teamId, taskId, docId) => {
    const task = await TaskRepository.GetById(taskId);
    if (!task) throw new CustomError(404, "Task not found");

    const isMember = await TeamRepository.IsMember(teamId, userId);
    if (!isMember) throw new CustomError(403, "User is not a member of the team");

    const document = await DocumentRepository.GetById(docId);
    if (!document) throw new CustomError(404, "Document not found");

    if (document.taskId !== taskId) throw new CustomError(400, "Document does not belong to the specified task");

    const deletedDocument = await DocumentRepository.Delete(docId);

    return deletedDocument;
  }
}