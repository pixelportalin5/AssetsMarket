import { UserStatus } from "@assetsmarket/database";

import { AppError } from "@/lib/errors.js";
import { env } from "@/config/env.js";
import { extractRoleSlugs, mapProfileToDto } from "@/lib/users/user.mapper.js";
import { findActiveUserById } from "@/lib/users/user.repository.js";
import type { UserWithProfile } from "@/lib/users/user.types.js";

import type {
  AuthResponseDto,
  AuthUserDto,
  LoginInput,
  LogoutInput,
  RefreshInput,
  RegisterInput,
} from "./auth.dto.js";
import { authRepository } from "./auth.repository.js";
import {
  generateRefreshToken,
  getRefreshTokenExpiry,
  hashPassword,
  signAccessToken,
  verifyPassword,
} from "./auth.tokens.js";
import { usersService } from "@/modules/users/users.service.js";

export class AuthService {
  async register(input: RegisterInput): Promise<AuthResponseDto> {
    await authRepository.ensureRolesSeeded();

    const passwordHash = await hashPassword(input.password);

    const user = await authRepository.createUserWithProfile({
      email: input.email,
      passwordHash,
      displayName: input.displayName,
      roleSlug: input.role,
    });

    return this.buildAuthResponse(user);
  }

  async login(input: LoginInput): Promise<AuthResponseDto> {
    const user = await authRepository.findUserByEmail(input.email);

    if (!user?.passwordHash) {
      throw new AppError("Invalid email or password", {
        statusCode: 401,
        code: "INVALID_CREDENTIALS",
      });
    }

    this.assertUserCanAuthenticate(user.status);

    const valid = await verifyPassword(input.password, user.passwordHash);

    if (!valid) {
      throw new AppError("Invalid email or password", {
        statusCode: 401,
        code: "INVALID_CREDENTIALS",
      });
    }

    await authRepository.updateLastLogin(user.id);

    const refreshed = await findActiveUserById(user.id);

    if (!refreshed) {
      throw new AppError("User account not found", {
        statusCode: 404,
        code: "USER_NOT_FOUND",
      });
    }

    return this.buildAuthResponse(refreshed);
  }

  async refresh(input: RefreshInput): Promise<AuthResponseDto> {
    const stored = await authRepository.findActiveRefreshToken(input.refreshToken);

    if (!stored) {
      throw new AppError("Invalid or expired refresh token", {
        statusCode: 401,
        code: "INVALID_REFRESH_TOKEN",
      });
    }

    this.assertUserCanAuthenticate(stored.user.status);

    const newRefreshToken = generateRefreshToken();
    const expiresAt = getRefreshTokenExpiry();

    await authRepository.rotateRefreshToken(
      stored.id,
      stored.userId,
      newRefreshToken,
      expiresAt,
    );

    const roles = extractRoleSlugs(stored.user);
    const accessToken = signAccessToken({
      sub: stored.user.id,
      email: stored.user.email,
      roles,
    });

    return {
      user: this.mapUser(stored.user),
      tokens: {
        accessToken,
        refreshToken: newRefreshToken,
        accessTokenExpiresIn: env.JWT_ACCESS_EXPIRES_IN,
        refreshTokenExpiresIn: env.JWT_REFRESH_EXPIRES_IN,
      },
    };
  }

  async logout(input: LogoutInput): Promise<void> {
    const revoked = await authRepository.revokeRefreshToken(input.refreshToken);

    if (!revoked) {
      throw new AppError("Invalid or expired refresh token", {
        statusCode: 401,
        code: "INVALID_REFRESH_TOKEN",
      });
    }
  }

  async getCurrentUser(userId: string): Promise<AuthUserDto> {
    return usersService.getMe(userId);
  }

  private async buildAuthResponse(user: UserWithProfile): Promise<AuthResponseDto> {
    const roles = extractRoleSlugs(user);
    const refreshToken = generateRefreshToken();
    const expiresAt = getRefreshTokenExpiry();

    await authRepository.createRefreshToken(user.id, refreshToken, expiresAt);

    const accessToken = signAccessToken({
      sub: user.id,
      email: user.email,
      roles,
    });

    return {
      user: this.mapUser(user),
      tokens: {
        accessToken,
        refreshToken,
        accessTokenExpiresIn: env.JWT_ACCESS_EXPIRES_IN,
        refreshTokenExpiresIn: env.JWT_REFRESH_EXPIRES_IN,
      },
    };
  }

  private mapUser(user: UserWithProfile): AuthUserDto {
    return {
      id: user.id,
      email: user.email,
      status: user.status,
      roles: extractRoleSlugs(user),
      profile: mapProfileToDto(user.profile),
      createdAt: user.createdAt.toISOString(),
      lastLoginAt: user.lastLoginAt?.toISOString() ?? null,
    };
  }

  private assertUserCanAuthenticate(status: UserStatus): void {
    if (status === UserStatus.SUSPENDED) {
      throw new AppError("Account is suspended", {
        statusCode: 403,
        code: "ACCOUNT_SUSPENDED",
      });
    }

    if (status === UserStatus.DEACTIVATED) {
      throw new AppError("Account is deactivated", {
        statusCode: 403,
        code: "ACCOUNT_DEACTIVATED",
      });
    }
  }
}

export const authService = new AuthService();
