import express from 'express';
import * as userController from '../Controllers/User.Controller';

export const userRouter = express.Router();

userRouter.post('/signup', userController.signUp);
userRouter.post('/login', userController.login);
