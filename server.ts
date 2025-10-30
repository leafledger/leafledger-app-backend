import authRoutes from "./src/modules/auth/auth.routes";

import express from "express";

const app = express();
app.use(express.json());

// API calling request
app.use("/api/auth", authRoutes);

const port = 8000;
app.listen(port, () => {
    console.log(`App is running on port ${port}`)
})