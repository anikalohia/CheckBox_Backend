import express from "express";
import { getUserData } from "../controllers/userController.js"; 
import { authMiddleWare } from "../middleware/authmiddleware.js";
const userRouter = express.Router();

userRouter.get('/dashboard',authMiddleWare, getUserData);

export default userRouter;  