import pool from "../db";

interface Task {
  id?: number;
  title: string;
  description?: string;
  completed: boolean;
  user_id?: number;
}

const getAllTasks = async (): Promise<Task[]> => {
  try {
    const [rows] = await pool.query("SELECT * FROM tasks");
    return rows as Task[];
  } catch (error) {
    console.error("Error fetching tasks:", error);
    throw error;
  }
};

const createTask = async (task: Task): Promise<void> => {
  const { title, description, completed, user_id } = task;
  await pool.query(
    "INSERT INTO tasks (title, description, completed, user_id) VALUES (?, ?, ?, ?)",
    [title, description || null, completed, user_id || null]
  );
};

export { getAllTasks, createTask };
