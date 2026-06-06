import { prisma } from "@/lib/prisma.js";
import { userWithProfileInclude, type UserWithProfile } from "@/lib/users/user.types.js";

export async function findActiveUserById(id: string): Promise<UserWithProfile | null> {
  return prisma.user.findFirst({
    where: { id, deletedAt: null },
    include: userWithProfileInclude,
  });
}

export async function findActiveUserByEmail(email: string): Promise<UserWithProfile | null> {
  return prisma.user.findFirst({
    where: { email, deletedAt: null },
    include: userWithProfileInclude,
  });
}
