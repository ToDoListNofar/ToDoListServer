import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { Request, Response } from "express";
import pool from "../db";
import { createUser, findUserByEmail } from "../models/userModel";

const registerUser = async (req: Request, res: Response) => {
  const { email, password, name } = req.body;

  if (!email || !password || !name) {
    res.status(400).send("Missing email, password, or name");
    return;
  }

  try {
    const [rows] = await pool.query("SELECT * FROM users WHERE email = ?", [
      email,
    ]);
    if ((rows as any[]).length > 0) {
      res.status(400).json({ error: "Email already in use" });
      return;
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    await createUser({ email, password: hashedPassword, name });

    res.status(201).json({ message: "User registered successfully" });
  } catch (error) {
    console.error("Error registering user:", error);
    res.status(500).json({ error: "Failed to register user" });
  }
};

const loginUser = async (req: Request, res: Response) => {
  const { email, password } = req.body;
  if (!email || !password) {
    res.status(400).json({ error: "Email or password is null" });
    return;
  }
  try {
    const user = await findUserByEmail(email);

    if (!user) {
      res.status(404).json({ error: "User not found" });
      return;
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      res.status(400).json({ error: "Invalid credentials" });
      return;
    }

    const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET as string, {
      expiresIn: "1h",
    });
    console.log("Sending Response:", { token, userId: user.id });

    res
      .status(200)
      .json({ token, userId: user.id, message: "Login successful" });
  } catch (error) {
    console.error("Error logging in:", error);
    res.status(500).json({ error: "Failed to login" });
  }
};

export default {
  registerUser,
  loginUser,
};
