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

const getUserTasks = async (user_id: string): Promise<Task[]> => {
  try {
    const [rows] = await pool.query("SELECT * FROM tasks where user_id = ?", [
      user_id,
    ]);
    return rows as Task[];
  } catch (error) {
    console.error("Error fetching user tasks:", error);
    throw error;
  }
};
const createTask = async (task: Task): Promise<void> => {
  const { title, description, completed, user_id } = task;
  await pool.query(
    "INSERT INTO tasks (title, description, completed, user_id) VALUES (?, ?, ?, ?)",
    [title, description || null, completed, user_id || null]
  );
  console.log(`Task ${title} added successfully`);
};

const deleteTask = async (taskId: number): Promise<void> => {
  try {
    await pool.query("DELETE FROM tasks WHERE id = ?", [taskId]);
    console.log(`Task with ID ${taskId} deleted`);
  } catch (error) {
    console.error("Error deleting task:", error);
    throw error;
  }
};

const updateTask = async (
  taskId: number,
  updatedFields: Partial<Task>
): Promise<void> => {
  const { title, description, completed } = updatedFields;
  try {
    await pool.query(
      `UPDATE tasks  
    SET title = COALESCE(?, title), 
        description = COALESCE(?, description), 
        completed = COALESCE(?, completed)
         where id = ?`,
      [title, description || null, completed, taskId]
    );
    console.log(`Task with ID ${taskId} updated successfully`);
  } catch (error) {
    console.error("Error updating task:", error);
    throw new Error("Failed to update task");
  }
};
export { getAllTasks, getUserTasks, createTask, deleteTask, updateTask };
