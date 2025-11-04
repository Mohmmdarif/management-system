import { CustomError } from "../utils/customError.js";

export const errorHandler = (
  err,
  req,
  res,
  next
) => {
  console.error(err); // Untuk debugging

  if (err instanceof CustomError) {
    return res.status(err.statusCode).json({
      success: false,
      message: err.message,
      details: err.details || null,
    });
  }

  if (err instanceof Error) {
    return res.status(400).json({
      success: false,
      message: err.message,
      details: null,
    });
  }

  return res.status(500).json({
    success: false,
    message: "Something went wrong!",
    details: null,
  });
};