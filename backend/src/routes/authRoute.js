import express, { Router } from "express";
import { signIn, signout, signUp } from "../controller/authController.js";

const router = Router();

router.post("/signup", signUp);
router.post("/signin", signIn);
router.get("/signout", signout);
export default router;
