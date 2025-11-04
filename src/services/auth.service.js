import { AuthRepository } from "../repositories/auth.repository.js";
import { CustomError } from "../utils/customError.js";
import { comparePassword, encrypt } from "../utils/encryption.js";
import { generateToken } from "../utils/jwt.js";

export const AuthService = {
  CreateUser: async (payload) => {
    const { email, username, password, name, role } = payload;

    const existingUser = await AuthRepository.FindByEmail(email);

    if (existingUser) {
      throw new CustomError(400, "Email already registered");
    }

    const hashedPassword = await encrypt(password);

    const user = await AuthRepository.Create({
      email,
      username,
      name,
      password: hashedPassword,
      ...(role ? { role } : {}),
    });

    const { password: userPassword, ...userWithoutPassword } = user;

    return userWithoutPassword;
  },

  Login: async (payload) => {
    const { email, password } = payload;

    const user = await AuthRepository.FindByEmail(email);

    if (!user) {
      throw new CustomError(404, "User not found");
    }

    const isPasswordMatch = await comparePassword(
      password,
      user.password
    );

    if (!isPasswordMatch) {
      throw new CustomError(400, "Password is incorrect");
    }

    const data = {
      id: user.id,
      email: user.email,
      name: user.name,
      username: user.username,
      role: user.role,
    };

    const token = generateToken(data);

    return token;
  },
};