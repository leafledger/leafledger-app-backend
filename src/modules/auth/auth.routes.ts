import express from "express";
import { signup, login } from "./auth.controller";

const router = express.Router();

// API for AUTH
router.post("/signup", signup);
router.post("/login", login);

// API for product
// router.route("/catalog").get(protect, catalog)

export default router;