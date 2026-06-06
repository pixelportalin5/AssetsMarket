import { UserStatus } from "@assetsmarket/database";

import { AppError } from "@/lib/errors.js";
import { extractRoleSlugs, mapProfileToDto } from "@/lib/users/user.mapper.js";

import type { PublicUserDto, UpdateProfileInput, UserMeDto } from "./users.dto.js";
import { usersRepository } from "./users.repository.js";

export class UsersService {
  async getMe(userId: string): Promise<UserMeDto> {
    const user = await usersRepository.findById(userId);

    if (!user) {
      throw new AppError("User account not found", {
        statusCode: 404,
        code: "USER_NOT_FOUND",
      });
    }

    this.assertActiveAccount(user.status);

    return this.mapMe(user);
  }

  async updateMe(userId: string, input: UpdateProfileInput): Promise<UserMeDto> {
    const user = await usersRepository.updateProfile(userId, input);
    return this.mapMe(user);
  }

  async getById(userId: string): Promise<PublicUserDto> {
    const user = await usersRepository.findById(userId);

    if (!user) {
      throw new AppError("User not found", {
        statusCode: 404,
        code: "USER_NOT_FOUND",
      });
    }

    if (user.status !== UserStatus.ACTIVE) {
      throw new AppError("User not found", {
        statusCode: 404,
        code: "USER_NOT_FOUND",
      });
    }

    return this.mapPublic(user);
  }

  private mapMe(user: NonNullable<Awaited<ReturnType<typeof usersRepository.findById>>>): UserMeDto {
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

  private mapPublic(
    user: NonNullable<Awaited<ReturnType<typeof usersRepository.findById>>>,
  ): PublicUserDto {
    return {
      id: user.id,
      roles: extractRoleSlugs(user),
      profile: mapProfileToDto(user.profile),
      createdAt: user.createdAt.toISOString(),
    };
  }

  private assertActiveAccount(status: UserStatus): void {
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

export const usersService = new UsersService();
