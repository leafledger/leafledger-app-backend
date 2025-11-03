import authRoutes from "./src/modules/auth/auth.routes";
import { errorHandler } from "./src/middleware/errorHandler";

import cors from "cors";
import express from "express";
import { config } from "./src/config/config";
import dotenv from "dotenv";

// Load environment variables
dotenv.config();

const app = express();

// Middleware
app.use(express.json());

//Enable CORS for all requests
app.use(
  cors({
    origin:
      process.env.NODE_ENV === "production"
        ? process.env.FRONTEND_URL
        : "http://localhost:5173",
    credentials: true, // We will allow cookies if needed
  })
);

// API calling request
app.use("/api", authRoutes);

// Global error handler - should be the last middleware
app.use(errorHandler);

const port = config.server.port;
app.listen(port, () => {
  console.log(`App is running on port ${port}`);
});
