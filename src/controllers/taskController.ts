import { Request, Response } from "express";
import {
  getAllTasks,
  createTask,
  deleteTask,
  updateTask,
} from "../models/taskModel";

export const getTasks = async (req: Request, res: Response): Promise<void> => {
  try {
    const tasks = await getAllTasks();
    res.status(200).json(tasks);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch tasks" });
  }
};

export const addTask = async (req: Request, res: Response): Promise<void> => {
  try {
    const { title, description, completed, user_id } = req.body;
    if (!title) {
      res.status(400).json({ error: "Title is required" });
      return;
    }
    await createTask({ title, description, completed, user_id });
    res.status(201).json({ message: "Task created successfully" });
  } catch (error: unknown) {
    console.log(error);
    res.status(500).json({ error: "Failed to create task" });
  }
};

export const removeTask = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const id = req.params.id;
    if (!id) {
      res.status(400).json({ error: "Task ID is required" });
      return;
    }
    if (isNaN(Number(id))) {
      res.status(400).json({ error: "Task ID must be a valid number" });
      return;
    }
    await deleteTask(Number(id));
    res.status(200).json({ message: "Task deleted successfully" });
  } catch (error: unknown) {
    console.error("Error deleting task:", error);
    res.status(500).json({ error: "Failed to remove task" });
  }
};
export const editTask = async (req: Request, res: Response): Promise<void> => {
  const id = req.params.id;
  const { title, description, completed } = req.body;

  if (!id || isNaN(Number(id))) {
    res.status(400).json({ error: "Task ID must be a valid number" });
    return;
  }

  if (typeof completed !== "boolean") {
    res.status(400).json({ error: "Completed must be a boolean" });
    return;
  }

  try {
    await updateTask(Number(id), { title, description, completed });
    res.status(200).json({ message: "Task updated successfully" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Failed to update task" });
  }
};
