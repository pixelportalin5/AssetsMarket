import { Prisma } from "@assetsmarket/database";

import { prisma } from "@/lib/prisma.js";
import { AppError } from "@/lib/errors.js";
import { findActiveUserByEmail } from "@/lib/users/user.repository.js";
import { userWithProfileInclude, type UserWithProfile } from "@/lib/users/user.types.js";

import { SEED_ROLES } from "./auth.constants.js";
import type { RoleSlug } from "./auth.constants.js";
import { hashRefreshToken } from "./auth.tokens.js";

export class AuthRepository {
  async ensureRolesSeeded(): Promise<void> {
    await Promise.all(
      SEED_ROLES.map((role) =>
        prisma.role.upsert({
          where: { slug: role.slug },
          create: {
            slug: role.slug,
            name: role.name,
            description: role.description,
          },
          update: {
            name: role.name,
            description: role.description,
          },
        }),
      ),
    );
  }

  findUserByEmail = findActiveUserByEmail;

  async createUserWithProfile(input: {
    email: string;
    passwordHash: string;
    displayName: string;
    roleSlug: RoleSlug;
  }): Promise<UserWithProfile> {
    try {
      return await prisma.$transaction(async (tx) => {
        const role = await tx.role.findUnique({ where: { slug: input.roleSlug } });

        if (!role) {
          throw new AppError(`Role ${input.roleSlug} is not configured`, {
            statusCode: 500,
            code: "ROLE_NOT_FOUND",
          });
        }

        return tx.user.create({
          data: {
            email: input.email,
            passwordHash: input.passwordHash,
            profile: {
              create: {
                displayName: input.displayName,
              },
            },
            roles: {
              create: {
                roleId: role.id,
              },
            },
          },
          include: userWithProfileInclude,
        });
      });
    } catch (error) {
      if (error instanceof Prisma.PrismaClientKnownRequestError && error.code === "P2002") {
        throw new AppError("An account with this email already exists", {
          statusCode: 409,
          code: "EMAIL_ALREADY_EXISTS",
        });
      }

      throw error;
    }
  }

  async updateLastLogin(userId: string): Promise<void> {
    await prisma.user.update({
      where: { id: userId },
      data: { lastLoginAt: new Date() },
    });
  }

  async createRefreshToken(userId: string, refreshToken: string, expiresAt: Date): Promise<void> {
    await prisma.refreshToken.create({
      data: {
        userId,
        tokenHash: hashRefreshToken(refreshToken),
        expiresAt,
      },
    });
  }

  async findActiveRefreshToken(refreshToken: string) {
    return prisma.refreshToken.findFirst({
      where: {
        tokenHash: hashRefreshToken(refreshToken),
        revokedAt: null,
        expiresAt: { gt: new Date() },
      },
      include: {
        user: {
          include: userWithProfileInclude,
        },
      },
    });
  }

  async revokeRefreshToken(refreshToken: string): Promise<boolean> {
    const result = await prisma.refreshToken.updateMany({
      where: {
        tokenHash: hashRefreshToken(refreshToken),
        revokedAt: null,
      },
      data: { revokedAt: new Date() },
    });

    return result.count > 0;
  }

  async revokeRefreshTokenById(id: string, tx?: Prisma.TransactionClient): Promise<void> {
    const client = tx ?? prisma;
    await client.refreshToken.update({
      where: { id },
      data: { revokedAt: new Date() },
    });
  }

  async rotateRefreshToken(
    existingTokenId: string,
    userId: string,
    newRefreshToken: string,
    expiresAt: Date,
  ): Promise<void> {
    await prisma.$transaction(async (tx) => {
      await this.revokeRefreshTokenById(existingTokenId, tx);
      await tx.refreshToken.create({
        data: {
          userId,
          tokenHash: hashRefreshToken(newRefreshToken),
          expiresAt,
        },
      });
    });
  }
}

export const authRepository = new AuthRepository();
