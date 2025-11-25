import prisma from "../db/index.js";

export const DocumentRepository = {
  Upload: async (taskId, uploadResult, uploaderId, originalFilename) => {
    const url = uploadResult?.secure_url;
    if (!url) throw new Error("Cloudinary upload failed: secure_url missing");

    const filename = originalFilename;

    const document = await prisma.document.create({
      data: {
        taskId,
        uploadedById: uploaderId,
        filename,
        url,
      },
    });

    return document;
  },

  ListByTask: async (taskId) => {
    const documents = await prisma.document.findMany({
      where: { taskId },
      orderBy: { createdAt: "desc" },
    });
    return documents;
  },

  GetById: async (docId) => {
    const document = await prisma.document.findUnique({
      where: { id: docId },
    });
    return document;
  },

  Delete: async (docId) => {
    const document = await prisma.document.delete({
      where: { id: docId },
    });
    return document;
  },
}