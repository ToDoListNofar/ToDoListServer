import { Router } from "express";
import authRoute from "./authRoutes";
import taskRoute from "./taskRoutes";

// Export the base-router
const baseRouter = Router();

baseRouter.use("/tasks", taskRoute);
baseRouter.use("/auth", authRoute);

export default baseRouter;
