import { RowDataPacket } from "mysql2";
import pool from "../db";
import bcrypt from "bcrypt";

export interface User {
  id?: number;
  email: string;
  password: string;
  name?: string;
  created_at?: Date;
}

export const createUser = async (user: User): Promise<void> => {
  const { email, password, name } = user;
  await pool.query(
    "INSERT INTO users (email, password, name) VALUES (?, ?, ?)",
    [email, password, name || null]
  );
};
export const findUserByEmail = async (email: string): Promise<User | null> => {
  const [rows] = await pool.query<RowDataPacket[]>(
    "SELECT * FROM users WHERE email = ?",
    [email]
  );
  const users = rows as User[];
  return users.length > 0 ? users[0] : null;
};

/*
export const authenticateUser = async (
  email: string,
  password: string
): Promise<boolean> => {
  const user = await findUserByEmail(email);
  if (!user) return false;
  return await bcrypt.compare(password, user.password);
};
*/
export const getAllUsers = async (): Promise<User[]> => {
  const [rows] = await pool.query("SELECT * FROM users");
  return rows as User[];
};
