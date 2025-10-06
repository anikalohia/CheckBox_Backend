import express from 'express'
import { loggout, login, register } from '../controllers/authController.js';

const authRouter = express.Router();

authRouter.post('/create',register)
authRouter.post('/login',login)
authRouter.get('/logout',loggout)

export default authRouter;
