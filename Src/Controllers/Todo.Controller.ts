import { PrismaClient } from '@prisma/client';
import { Response, Request } from 'express';

const prisma = new PrismaClient();

export const getAllList = async (req: Request, res: Response): Promise<any> => {
  const { userId } = req.body.user;
  const todo = await prisma.todo.findMany({
    where: {
      userId,
    },
  });
  return res.status(200).json({
    todo,
  });
};

export const createList = async (req: Request, res: Response): Promise<any> => {
  const { name, description } = req.body;
  const { userId } = req.body.user;
  const todo = await prisma.todo.create({
    data: {
      name,
      description,
      userId,
    },
  });
  return res.status(200).json({
    todo,
  });
};

export const getSingleList = async (
  req: Request,
  res: Response
): Promise<any> => {
  const { id } = req.params;
  const { userId } = req.body.user;
  const todo = await prisma.todo.findUnique({
    where: {
      id: parseInt(id),
    },
  });

  if (todo?.userId !== userId) {
    return res.status(401).json({
      message: 'User not Authorized',
    });
  }

  if (!todo) {
    return res.status(404).json({
      message: 'todo not list',
    });
  }
  return res.status(200).json({
    todo,
  });
};

export const updateList = async (req: Request, res: Response): Promise<any> => {
  const { id } = req.params;
  const { name, description } = req.body;
  const { userId } = req.body.user;
  const todo = await prisma.todo.update({
    where: {
      id: parseInt(id),
    },
    data: {
      name,
      description,
    },
  });
  if (!todo) {
    return res.status(404).json({
      message: ' todo does not exst',
    });
  }
  if (todo.userId !== userId) {
    return res.status(401).json({
      message: 'User not Authorized',
    });
  }

  return res.status(200).json({
    todo,
  });
};

export const deleteList = async (req: Request, res: Response): Promise<any> => {
  const { id } = req.params;
  const { userId } = req.body.user;
  const todo = await prisma.todo.delete({
    where: {
      id: parseInt(id),
    },
  });
  if (!todo) {
    return res.status(404).json({
      message: 'todo does not exist',
    });
  }
  if (todo.userId !== userId) {
    return res.status(401).json({
      message: 'User not Authorized',
    });
  }

  return res.status(200).json({
    message: 'todo successfully deleted',
  });
};
