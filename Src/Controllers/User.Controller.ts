import { Request, Response } from 'express';
import * as bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export const signUp = async (req: Request, res: Response) => {
  const { email, password } = req.body;
  const emailExist = await prisma.user.findUnique({
    where: { email },
  });
  if (emailExist) {
    return res.status(400).json({
      message: 'email already exist',
    });
  }
  const hashPassword = await bcrypt.hash(password, 12);
  const user = await prisma.user.create({
    data: {
      email,
      password: hashPassword,
    },
  });
  return res.status(200).json({
    user,
  });
};

export const login = async (req: Request, res: Response) => {
  const { email, password } = req.body;
  const user = await prisma.user.findUnique({ where: { email } });
  if (user && user.password) {
    const ispasswordCorrect = bcrypt.compare(password, user?.password);
    if (!ispasswordCorrect) {
      return res.status(400).json({
        message: 'Invalid password',
      });
    }
  }
  const token = jwt.sign(
    {
      userId: user?.id,
      email: user?.email,
    },

    'secret',
    { expiresIn: '2h' }
  );

  return res.status(200).json({
    token,
    user,
  });
};
