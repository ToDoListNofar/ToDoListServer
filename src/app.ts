import express, { Application } from "express";

const initApp = async (): Promise<Application> => {
  const app = express();

  // Middleware לקריאת נתונים בפורמט JSON
  app.use(express.json());

  // דוגמה לנתיב בסיסי
  app.get("/", (req, res) => {
    res.send("Hello from the app!");
  });

  return app;
};

export default initApp;
