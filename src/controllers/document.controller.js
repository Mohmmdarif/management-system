import * as Yup from 'yup';
import { CustomError } from '../utils/customError.js';
import { DocumentService } from '../services/document.service.js';

export const DocumentController = {
  uploadDocument: async (req, res, _next) => {
    try {
      const { teamId, taskId } = req.params;
      const file = req.file;

      const document = await DocumentService.uploadDocument(req.user.id, teamId, taskId, file);

      res.status(201).json({
        success: true,
        message: "Document successfully uploaded",
        data: document,
      });
    } catch (error) {
      _next(error);
    }
  },

  listDocument: async (req, res, _next) => {
    try {
      const { teamId, taskId } = req.params;

      const documents = await DocumentService.listDocument(req.user.id, teamId, taskId);

      res.status(200).json({
        success: true,
        message: "Documents successfully retrieved",
        data: documents,
      });
    } catch (error) {
      _next(error);
    }
  },

  deleteDocument: async (req, res, _next) => {
    try {
      const { teamId, taskId, docId } = req.params;

      const document = await DocumentService.deleteDocument(req.user.id, teamId, taskId, docId);

      res.status(200).json({
        success: true,
        message: "Document successfully deleted",
        data: document,
      });
    } catch (error) {
      _next(error);
    }
  }
};