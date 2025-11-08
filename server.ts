import authRoutes from "./src/modules/auth/auth.routes";
import { errorHandler } from "./src/middleware/errorHandler";
import refreshRouter from "./src/modules/refresh/refresh.router";

import cors from "cors";
import express from "express";
import { config } from "./src/config/config";
import dotenv from "dotenv";
import logoutRouter from "./src/modules/logout/logout.routes";
import swaggerUi from 'swagger-ui-express';
import swaggerSpec from './src/config/swagger.config';

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

// Swagger documentation
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));
app.get('/api-docs.json', (req, res) => {
  res.setHeader('Content-Type', 'application/json');
  res.send(swaggerSpec);
});

// Global error handler - should be the last middleware
app.use(errorHandler);


app.use("/refresh", refreshRouter);

app.use("/logout", logoutRouter);

const port = config.server.port;
app.listen(port, () => {
  console.log(`App is running on port ${port}`);
});
