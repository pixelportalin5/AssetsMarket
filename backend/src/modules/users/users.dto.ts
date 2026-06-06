import type { RoleSlug } from "@/modules/auth/auth.constants.js";

export interface UserProfileDto {
  displayName: string;
  firstName: string | null;
  lastName: string | null;
  bio: string | null;
  avatar: string | null;
  company: string | null;
  website: string | null;
  country: string | null;
  timezone: string | null;
}

export interface UserMeDto {
  id: string;
  email: string;
  status: string;
  roles: RoleSlug[];
  profile: UserProfileDto | null;
  createdAt: string;
  lastLoginAt: string | null;
}

export interface PublicUserDto {
  id: string;
  roles: RoleSlug[];
  profile: UserProfileDto | null;
  createdAt: string;
}

export interface UpdateProfileInput {
  firstName?: string;
  lastName?: string;
  bio?: string | null;
  avatar?: string | null;
  company?: string | null;
  website?: string | null;
  country?: string | null;
  timezone?: string | null;
}
