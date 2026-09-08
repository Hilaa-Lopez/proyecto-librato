import bcrypt from 'bcrypt';
import crypto from 'crypto';
import jwt from 'jsonwebtoken';
import { PrismaClient, SubscriptionTier } from '@prisma/client';
import { ENV } from '../../config/env';
import { RegisterInput, LoginInput } from './auth.schema';

const prisma = new PrismaClient();

export interface TokenPayload {
  userId: string;
  isCreator: boolean;
  isAdmin: boolean;
  tier: SubscriptionTier;
}

export class AuthService {
  private static hashToken(token: string): string {
    return crypto.createHash('sha256').update(token).digest('hex');
  }

  private static generateAccessToken(payload: TokenPayload): string {
    return jwt.sign(payload, ENV.JWT_ACCESS_SECRET, {
      expiresIn: ENV.ACCESS_TOKEN_EXPIRES_IN,
    });
  }

  private static async createRefreshTokenRecord(userId: string): Promise<string> {
    const rawToken = crypto.randomBytes(40).toString('hex');
    const tokenHash = this.hashToken(rawToken);

    const expiresAt = new Date();
    expiresAt.setDate(expiresAt.getDate() + ENV.REFRESH_TOKEN_EXPIRES_DAYS);

    await prisma.refreshToken.create({
      data: {
        tokenHash,
        userId,
        expiresAt,
      },
    });

    return rawToken;
  }

  static async register(input: RegisterInput) {
    const existing = await prisma.user.findFirst({
      where: {
        OR: [{ email: input.email }, { username: input.username }],
      },
    });

    if (existing) {
      throw new Error('El correo electrónico o nombre de usuario ya está registrado');
    }

    const saltRounds = 10;
    const passwordHash = await bcrypt.hash(input.password, saltRounds);

    const user = await prisma.user.create({
      data: {
        email: input.email,
        username: input.username,
        passwordHash,
        isCreator: input.isCreator,
        tier: SubscriptionTier.FREE,
      },
      select: {
        id: true,
        email: true,
        username: true,
        isCreator: true,
        isAdmin: true,
        tier: true,
        createdAt: true,
      },
    });

    const accessToken = this.generateAccessToken({
      userId: user.id,
      isCreator: user.isCreator,
      isAdmin: user.isAdmin,
      tier: user.tier,
    });
    const refreshToken = await this.createRefreshTokenRecord(user.id);

    return { user, accessToken, refreshToken };
  }

  static async login(input: LoginInput) {
    const user = await prisma.user.findUnique({
      where: { email: input.email },
    });

    if (!user) {
      throw new Error('Credenciales inválidas');
    }

    const isValidPassword = await bcrypt.compare(input.password, user.passwordHash);
    if (!isValidPassword) {
      throw new Error('Credenciales inválidas');
    }

    const now = new Date();
    let currentTier = user.tier;
    if (user.tier === SubscriptionTier.PREMIUM && user.tierExpiresAt && user.tierExpiresAt < now) {
      currentTier = SubscriptionTier.FREE;
      await prisma.user.update({
        where: { id: user.id },
        data: { tier: SubscriptionTier.FREE, isSubActive: false },
      });
    }

    const accessToken = this.generateAccessToken({
      userId: user.id,
      isCreator: user.isCreator,
      isAdmin: user.isAdmin,
      tier: currentTier,
    });
    const refreshToken = await this.createRefreshTokenRecord(user.id);

    return {
      user: {
        id: user.id,
        email: user.email,
        username: user.username,
        isCreator: user.isCreator,
        isAdmin: user.isAdmin,
        tier: currentTier,
      },
      accessToken,
      refreshToken,
    };
  }

  static async rotateRefreshToken(rawRefreshToken: string) {
    const tokenHash = this.hashToken(rawRefreshToken);

    const storedToken = await prisma.refreshToken.findUnique({
      where: { tokenHash },
      include: { user: true },
    });

    if (!storedToken || storedToken.revoked || storedToken.expiresAt < new Date()) {
      throw new Error('Refresh token inválido o expirado');
    }

    // Revocar el token usado (rotación para prevenir reuso)
    await prisma.refreshToken.update({
      where: { id: storedToken.id },
      data: { revoked: true },
    });

    const user = storedToken.user;
    const newAccessToken = this.generateAccessToken({
      userId: user.id,
      isCreator: user.isCreator,
      isAdmin: user.isAdmin,
      tier: user.tier,
    });
    const newRefreshToken = await this.createRefreshTokenRecord(user.id);

    return {
      accessToken: newAccessToken,
      refreshToken: newRefreshToken,
    };
  }

  static async logout(rawRefreshToken: string) {
    const tokenHash = this.hashToken(rawRefreshToken);
    await prisma.refreshToken.updateMany({
      where: { tokenHash },
      data: { revoked: true },
    });
  }
}