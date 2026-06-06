import type { User, UserProfile } from "@assetsmarket/database";

export const userWithProfileInclude = {
  profile: true,
  roles: { include: { role: true } },
} as const;

export type UserWithProfile = User & {
  profile: UserProfile | null;
  roles: Array<{ role: { slug: string; name: string } }>;
};
