import { prisma } from "@/lib/prisma.js";
import { AppError } from "@/lib/errors.js";
import { buildDisplayName } from "@/lib/users/user.mapper.js";
import { findActiveUserById } from "@/lib/users/user.repository.js";
import { userWithProfileInclude, type UserWithProfile } from "@/lib/users/user.types.js";

import type { UpdateProfileInput } from "./users.dto.js";

export class UsersRepository {
  findById = findActiveUserById;

  async updateProfile(userId: string, input: UpdateProfileInput): Promise<UserWithProfile> {
    const existing = await findActiveUserById(userId);

    if (!existing?.profile) {
      throw new AppError("User profile not found", {
        statusCode: 404,
        code: "PROFILE_NOT_FOUND",
      });
    }

    const profile = existing.profile;
    const nextFirstName = input.firstName ?? profile.firstName;
    const nextLastName = input.lastName ?? profile.lastName;

    const displayName =
      input.firstName !== undefined || input.lastName !== undefined
        ? buildDisplayName({
            firstName: nextFirstName,
            lastName: nextLastName,
            fallback: profile.displayName,
          })
        : profile.displayName;

    return prisma.user.update({
      where: { id: userId },
      data: {
        profile: {
          update: {
            displayName,
            ...(input.firstName !== undefined ? { firstName: input.firstName } : {}),
            ...(input.lastName !== undefined ? { lastName: input.lastName } : {}),
            ...(input.bio !== undefined ? { bio: input.bio } : {}),
            ...(input.avatar !== undefined ? { avatarUrl: input.avatar } : {}),
            ...(input.company !== undefined ? { companyName: input.company } : {}),
            ...(input.website !== undefined ? { website: input.website } : {}),
            ...(input.country !== undefined ? { country: input.country } : {}),
            ...(input.timezone !== undefined ? { timezone: input.timezone } : {}),
          },
        },
      },
      include: userWithProfileInclude,
    });
  }
}

export const usersRepository = new UsersRepository();
