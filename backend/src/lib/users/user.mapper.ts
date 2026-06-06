import type { UserProfile } from "@assetsmarket/database";

import type { UserProfileDto } from "@/modules/users/users.dto.js";
import type { RoleSlug } from "@/modules/auth/auth.constants.js";
import type { UserWithProfile } from "./user.types.js";

export function mapProfileToDto(profile: UserProfile | null): UserProfileDto | null {
  if (!profile || profile.deletedAt) {
    return null;
  }

  return {
    displayName: profile.displayName,
    firstName: profile.firstName,
    lastName: profile.lastName,
    bio: profile.bio,
    avatar: profile.avatarUrl,
    company: profile.companyName,
    website: profile.website,
    country: profile.country,
    timezone: profile.timezone,
  };
}

export function extractRoleSlugs(user: UserWithProfile): RoleSlug[] {
  return user.roles.map((entry) => entry.role.slug as RoleSlug);
}

export function buildDisplayName(input: {
  firstName?: string | null;
  lastName?: string | null;
  fallback: string;
}): string {
  const parts = [input.firstName, input.lastName].filter(
    (part): part is string => typeof part === "string" && part.length > 0,
  );

  if (parts.length === 0) {
    return input.fallback;
  }

  return parts.join(" ");
}
