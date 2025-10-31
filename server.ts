import authRoutes from "./src/modules/auth/auth.routes";

import cors from "cors";
import express from "express";

const app = express();
app.use(express.json());

// Step 1: Enable CORS for all requests
app.use(cors({
  origin: "http://localhost:5173",  // frontend URL
  credentials: true,                 // allow cookies if needed
}));

// API calling request
app.use("/api/auth", authRoutes);

const port = 8000;
app.listen(port, () => {
    console.log(`App is running on port ${port}`)
})