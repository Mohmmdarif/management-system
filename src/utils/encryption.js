import bcrypt from "bcrypt";

export const encrypt = async (password) => {
  const encryptedPassword = await bcrypt.hash(password, 10);
  return encryptedPassword;
};

export const comparePassword = async (
  password,
  hash
) => {
  const isMatchPassword = await bcrypt.compare(password, hash);
  return isMatchPassword;
};