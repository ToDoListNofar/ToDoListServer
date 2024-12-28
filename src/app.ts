import express, { Application } from "express";
import pool from "./db";
import taskRoutes from "./routes/taskRoutes";

const initApp = async (): Promise<Application> => {
  const app = express();

  try {
    const connection = await pool.getConnection();
    console.log("Connected to MySQL Database");
    connection.release();
  } catch (error: unknown) {
    console.error("Error connecting to the database:");
  }

  app.use(express.json());
  /*
  app.get("/", (req, res) => {
    res.send("Hello from the app!");
  });*/
  app.use("/api/tasks", taskRoutes);

  return app;
};

export default initApp;
