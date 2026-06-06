export type RoleSlug = "ADMIN" | "MODERATOR" | "SELLER" | "ADVERTISER" | "BUYER";

export type RegisterableRoleSlug = "SELLER" | "ADVERTISER" | "BUYER";

export interface UserProfile {
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

export interface User {
  id: string;
  email: string;
  status: string;
  roles: RoleSlug[];
  profile: UserProfile | null;
  createdAt: string;
  lastLoginAt: string | null;
}

export interface AuthTokens {
  accessToken: string;
  refreshToken: string;
  accessTokenExpiresIn: string;
  refreshTokenExpiresIn: string;
}

export interface AuthResponse {
  user: User;
  tokens: AuthTokens;
}

export interface RegisterInput {
  email: string;
  password: string;
  displayName: string;
  role: RegisterableRoleSlug;
}

export interface LoginInput {
  email: string;
  password: string;
}

export interface ApiFieldErrors {
  [field: string]: string[] | undefined;
}
