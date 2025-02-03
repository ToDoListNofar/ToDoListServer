import express from "express";
import {
  getTasks,
  getAllUserTasks,
  addTask,
  removeTask,
  editTask,
} from "../controllers/taskController";

const router = express.Router();

router.get("/", getTasks);
router.get("/getUserTasks/:userId", getAllUserTasks);
router.post("/addTask", addTask);
router.delete("/removeTask/:id", removeTask);
router.put("/editTask/:id", editTask);

export default router;
