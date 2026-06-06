import { AppError } from "@/lib/errors.js";
import { assertActiveAccount, assertPublicActiveUser } from "@/lib/users/user.guards.js";
import { extractRoleSlugs, mapProfileToDto, mapUserToMeDto } from "@/lib/users/user.mapper.js";

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

    assertActiveAccount(user.status);

    return mapUserToMeDto(user);
  }

  async updateMe(userId: string, input: UpdateProfileInput): Promise<UserMeDto> {
    const user = await usersRepository.updateProfile(userId, input);
    return mapUserToMeDto(user);
  }

  async getById(userId: string): Promise<PublicUserDto> {
    const user = await usersRepository.findById(userId);

    if (!user) {
      throw new AppError("User not found", {
        statusCode: 404,
        code: "USER_NOT_FOUND",
      });
    }

    assertPublicActiveUser(user.status);

    return {
      id: user.id,
      roles: extractRoleSlugs(user),
      profile: mapProfileToDto(user.profile),
      createdAt: user.createdAt.toISOString(),
    };
  }
}

export const usersService = new UsersService();
