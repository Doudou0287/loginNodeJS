import express from "express";
import {index, signup, info, login, verify} from "../controllers/home";
import {existUser, authenticateUser} from "../middlewares/auth.js"

const router = express.Router();

// Root route
router.get("/", index);
router.get("/login", login);
router.post("/login",existUser, signup);
router.get("/info",authenticateUser ,info);
router.post("/verify",verify);

export default router;