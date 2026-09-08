import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import { ENV } from '../config/env';
import { TokenPayload } from '../modules/auth/auth.service';

declare global {
  namespace Express {
    interface Request {
      user?: TokenPayload;
    }
  }
}

export function authenticateToken(req: Request, res: Response, next: NextFunction) {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];

  if (!token) {
    return res.status(401).json({ message: 'Token de acceso no proporcionado' });
  }

  try {
    const decoded = jwt.verify(token, ENV.JWT_ACCESS_SECRET) as TokenPayload;
    req.user = decoded;
    return next();
  } catch (err) {
    return res.status(403).json({ message: 'Token de acceso inválido o expirado' });
  }
}