import type { RegisterableRoleSlug, RoleSlug } from "./auth.constants.js";
import type { UserMeDto } from "@/modules/users/users.dto.js";

/** Same shape as `UserMeDto` — used in auth responses. */
export type AuthUserDto = UserMeDto;

export interface AuthUser {
  id: string;
  email: string;
  roles: RoleSlug[];
}

export interface AuthTokens {
  accessToken: string;
  refreshToken: string;
  accessTokenExpiresIn: string;
  refreshTokenExpiresIn: string;
}

export interface AuthResponseDto {
  user: AuthUserDto;
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

export interface RefreshInput {
  refreshToken: string;
}

export interface LogoutInput {
  refreshToken: string;
}

export interface AccessTokenPayload {
  sub: string;
  email: string;
  roles: RoleSlug[];
  type: "access";
}
