import express from "express";
import { signup, login, protect, catalog } from "./auth.controller";

const router = express.Router();

// API for AUTH
router.post("/auth/signup", signup);
router.post("/auth/login", login);

// API for product
router.route("/catalog").get(protect, catalog)

export default router;
