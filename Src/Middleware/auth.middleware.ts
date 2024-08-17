import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

export const authMiddleware = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return res.status(401).json({ message: 'User not authorized' });
    }

    const token = authHeader.split(' ')[1];
    const decodedToken = jwt.verify(token, 'secret') as any;
    req.body.user = decodedToken;

    next();
  } catch (err) {
    return res
      .status(401)
      .json({ message: 'Invalid token, authorization denied' });
  }
};
