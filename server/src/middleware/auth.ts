import jwt from 'jsonwebtoken';
import { Request, Response, NextFunction } from 'express';

export const verifyToken = async (req: Request, res: Response, next: NextFunction) => {
  try {
    let token = req.header('Authorization');

    if (!token) {
      return res.status(403).send('Access Denied');
    }

    if (token.startsWith('Bearer ')) {
      token = token.slice(7, token.length).trim();
    }

    const verified = jwt.verify(token, String(process.env.JWT_SECRET));
    req.body.user = verified;

    next();
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
};
