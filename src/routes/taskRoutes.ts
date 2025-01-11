import express from "express";
import {
  getTasks,
  addTask,
  removeTask,
  editTask,
} from "../controllers/taskController";

const router = express.Router();

router.get("/", getTasks);
router.post("/addTask", addTask);
router.delete("/removeTask/:id", removeTask);
router.put("/editTask/:id", editTask);

export default router;
