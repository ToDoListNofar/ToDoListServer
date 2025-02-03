import { Router } from "express";
import authRoute from "./authRoutes";
import taskRoute from "./taskRoutes";

const baseRouter = Router();

baseRouter.use("/tasks", taskRoute);
baseRouter.use("/auth", authRoute);

export default baseRouter;
