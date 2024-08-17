import express from 'express';

import * as todoController from '../Controllers/Todo.Controller';
import { authMiddleware } from '../Middleware/auth.middleware';
export const todoRouter = express.Router();

todoRouter.use(authMiddleware);
todoRouter.get('/get-todo', todoController.getAllList);
todoRouter.post('/create-todo', todoController.createList);
todoRouter.put('/update-todo/:id', todoController.updateList);
todoRouter.get('/get-single-todo/:id', todoController.getSingleList);
todoRouter.delete('/delete-todo/:id', todoController.deleteList);
