import { apiRequest } from "@/lib/api-client";
import { getRefreshToken } from "@/lib/auth-storage";
import type { AuthResponse, LoginInput, RegisterInput, User } from "@/types/auth";

export const authService = {
  async register(input: RegisterInput): Promise<AuthResponse> {
    const response = await apiRequest<{ data: AuthResponse }>("/auth/register", {
      method: "POST",
      auth: false,
      body: JSON.stringify(input),
    });

    return response.data;
  },

  async login(input: LoginInput): Promise<AuthResponse> {
    const response = await apiRequest<{ data: AuthResponse }>("/auth/login", {
      method: "POST",
      auth: false,
      body: JSON.stringify(input),
    });

    return response.data;
  },

  async getMe(): Promise<User> {
    const response = await apiRequest<{ data: { user: User } }>("/users/me");
    return response.data.user;
  },

  async logout(): Promise<void> {
    const refreshToken = getRefreshToken();

    if (!refreshToken) {
      return;
    }

    await apiRequest<{ data: { success: boolean } }>("/auth/logout", {
      method: "POST",
      auth: false,
      body: JSON.stringify({ refreshToken }),
    }).catch(() => undefined);
  },
};
