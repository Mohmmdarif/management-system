import { v2 as cloudinary } from "cloudinary";

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
  secure: true,
});

export const handleUpload = async (buffer, originalName) => {
  return new Promise((resolve, reject) => {
    const base = originalName.replace(/\.[^/.]+$/, "");
    const timestamp = Date.now();
    const publicId = `${base}-${timestamp}`;

    cloudinary.uploader
      .upload_stream(
        {
          resource_type: "auto",
          folder: "documents",
          public_id: publicId,
          overwrite: false,
          unique_filename: false,
          access_mode: "public",
        },
        (error, result) => {
          if (error) return reject(error);
          resolve({ ...result, public_id: publicId });
        }
      )
      .end(buffer);
  });
};

export default cloudinary;