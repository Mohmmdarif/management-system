import * as Yup from "yup";
import {
  LoginSchema as loginSchema,
  RegisterSchema as registerSchema,
} from "../utils/validations/auth.validation.js";
import { AuthService } from "../services/auth.service.js";
import { CustomError } from "../utils/customError.js";

export const AuthController = {
  Register: async (
    req,
    res,
    _next
  ) => {
    try {
      await registerSchema.validate(req.body, {
        abortEarly: false,
      });

      const user = await AuthService.CreateUser(req.body);

      res.status(201).json({
        success: true,
        message: "User successfully registered",
        data: user,
      });
    } catch (error) {
      if (error instanceof Yup.ValidationError) {
        _next(new CustomError(400, "Validation failed", error.errors));
      }
      _next(error);
    }
  },

  Login: async (req, res, _next) => {
    try {
      await loginSchema.validate(req.body, {
        abortEarly: false,
      });

      const user = await AuthService.Login(req.body);

      res.status(200).json({
        success: true,
        message: "User successfully logged in",
        data: user,
      });
    } catch (error) {
      if (error instanceof Yup.ValidationError) {
        _next(new CustomError(400, "Validation failed", error.errors));
      }
      _next(error);
    }
  },
};