import express from 'express';

import * as todoController from '../Controllers/Todo.Controller';
import { authMiddleware } from '../Middleware/auth.middleware';
export const todoRouter = express.Router();

todoRouter.get('/get-todo', authMiddleware, todoController.getAllList);
todoRouter.post('/create-todo', authMiddleware, todoController.createList);
todoRouter.put('/update-todo/:id', authMiddleware, todoController.updateList);
todoRouter.delete(
  '/delete-todo/:id',
  authMiddleware,
  todoController.deleteList
);
