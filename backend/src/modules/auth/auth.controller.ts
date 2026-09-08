import { Request, Response } from 'express';
import { AuthService } from './auth.service';
import { RegisterSchema, LoginSchema, RefreshTokenSchema } from './auth.schema';

export class AuthController {
  static async register(req: Request, res: Response) {
    try {
      const data = RegisterSchema.parse(req.body);
      const result = await AuthService.register(data);
      return res.status(201).json(result);
    } catch (err: any) {
      return res.status(400).json({ message: err.message });
    }
  }

  static async login(req: Request, res: Response) {
    try {
      const data = LoginSchema.parse(req.body);
      const result = await AuthService.login(data);
      return res.status(200).json(result);
    } catch (err: any) {
      return res.status(401).json({ message: err.message });
    }
  }

  static async refresh(req: Request, res: Response) {
    try {
      const data = RefreshTokenSchema.parse(req.body);
      const result = await AuthService.rotateRefreshToken(data.refreshToken);
      return res.status(200).json(result);
    } catch (err: any) {
      return res.status(401).json({ message: err.message });
    }
  }

  static async logout(req: Request, res: Response) {
    try {
      const data = RefreshTokenSchema.parse(req.body);
      await AuthService.logout(data.refreshToken);
      return res.status(200).json({ message: 'Sesión cerrada correctamente' });
    } catch (err: any) {
      return res.status(400).json({ message: err.message });
    }
  }
}