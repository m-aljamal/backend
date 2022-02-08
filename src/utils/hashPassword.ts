import { genSaltSync, hashSync } from 'bcryptjs';

export const hashPassword = (password: string): string => {
  const salt = genSaltSync(10);
  return hashSync(password, salt);
};
