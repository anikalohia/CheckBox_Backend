import express from "express";
import {createTask, deleteTask, getTask, updateTask} from "../controllers/taskContoller.js";

const taskRouter = express.Router();
taskRouter.post('/create',createTask);
taskRouter.get('/get',getTask)
taskRouter.delete('/delete/:id',deleteTask)
taskRouter.patch('/update/:id',updateTask)

export default taskRouter;