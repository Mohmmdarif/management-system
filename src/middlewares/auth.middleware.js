import { getUserData } from "../utils/jwt.js";

export const verifyToken = async (
  req,
  res,
  _next
) => {
  const authorization = req.headers?.authorization;
  if (!authorization) {
    return res.status(403).json({
      message: "Unauthorized",
      data: null,
    });
  }

  const [prefix, token] = authorization.split(" ");

  if (!(prefix === "Bearer" && token)) {
    return res.status(403).json({
      message: "Unauthorized",
      data: null,
    });
  }

  const user = getUserData(token);

  if (!user) {
    return res.status(403).json({
      message: "Unauthorized",
      data: null,
    });
  }

  req.user = user;

  _next();
};