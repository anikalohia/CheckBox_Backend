import express from "express";
import {createTask, getTask} from "../controllers/taskContoller.js";

const taskRouter = express.Router();
taskRouter.post('/create',createTask);
taskRouter.get('/get',getTask)

export default taskRouter;