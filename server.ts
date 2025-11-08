import authRoutes from "./src/modules/auth/auth.routes";
import { errorHandler } from "./src/middleware/errorHandler";
import refreshRouter from "./src/modules/refresh/refresh.router";
import swaggerSpec from "./src/config/swagger.config";
import swaggerUi from "swagger-ui-express";

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

// Swagger Documentation Routes
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec, {
  customCss: '.swagger-ui .topbar { display: none }',
  customSiteTitle: "LeafLedger API Documentation",
}));

// Swagger JSON endpoint
app.get("/api-docs.json", (req, res) => {
  res.setHeader("Content-Type", "application/json");
  res.send(swaggerSpec);
});

// API calling request
app.use("/api", authRoutes);

// Global error handler - should be the last middleware
app.use(errorHandler);


app.use("/refresh", refreshRouter);

const port = config.server.port;
app.listen(port, () => {
  console.log(`App is running on port ${port}`);
});
