import initApp from "./app";
import http, { Server } from "http";

const startServer = async () => {
  try {
    const app = await initApp();
    const port: number | string = process.env.PORT || 3000;

    const server: Server = http.createServer(app);

    server.listen(port, () => {
      console.log(`Server running on http://localhost:${port}`);
    });

    server.on("error", (err) => {
      console.error("Error creating HTTP server:", err.message);
    });
  } catch (error) {
    // console.error("Error initializing app:", error.message);
  }
};

startServer();
