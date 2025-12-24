export type Apps = { name: string; icon: string };

export interface QueryParams {
  search?: string;
  type?: string;
  page?: number;
  limit?: number;
}

export interface User {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  role: string;
  status: string;
  profilePhoto?: string;
  hasOnboarded: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface IAuthTokens {
  accessToken: string;
  refreshToken: string;
}

export interface AuthUserResponse {
  user: User | null;
}
