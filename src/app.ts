import express, { Application } from "express";
import pool from "./db";
import taskRoutes from "./routes/taskRoutes";
import cors from "cors";
import BaseRouter from "./routes/index";

const initApp = async (): Promise<Application> => {
  const app = express();
  app.use(cors());
  try {
    const connection = await pool.getConnection();
    console.log("Connected to MySQL Database");
    connection.release();
  } catch (error: unknown) {
    console.error("Error connecting to the database:");
  }

  app.use(express.json());

  app.use("/api", BaseRouter);
  return app;
};

export default initApp;
