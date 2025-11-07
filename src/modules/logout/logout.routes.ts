import express from "express";
import { logout } from "./logout.controller";

const router = express.Router();

router.post('/', logout);

export default router;