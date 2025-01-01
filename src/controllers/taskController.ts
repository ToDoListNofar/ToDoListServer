import { Request, Response } from "express";
import { getAllTasks, createTask } from "../models/taskModel";

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
/*
(async () => {
  try {
    const tasks = await getAllTasks();
    console.log("Tasks fetched successfully:", tasks);

    await createTask({
      title: "Test Task",
      description: "This is a test task",
      completed: false,
    });
    console.log("Task created successfully");
  } catch (error) {
    console.error("Error in task functions:", error);
  }
})();
*/
