// lib/auth.ts
import { cookies } from 'next/headers';

import type { AuthUserResponse } from '@/types';

type MeResponse = {
  statusCode: number;
  data: AuthUserResponse;
};

const API_URL = process.env.NEXT_PUBLIC_API_URL;

// Read tokens from HTTP cookies on the server
async function getTokensFromCookies() {
  const cookieStore = await cookies();
  const accessToken = cookieStore.get('access_token')?.value;
  const refreshToken = cookieStore.get('refresh_token')?.value;
  return { accessToken, refreshToken };
}

// Call /auth/me with a token
async function fetchAuthUserWithToken(
  token: string,
): Promise<AuthUserResponse> {
  if (!API_URL) throw new Error('API URL is not configured');

  const res = await fetch(`${API_URL}/auth/me`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
    cache: 'no-store',
  });

  if (!res.ok) return { user: null };

  const data = (await res.json()) as MeResponse;

  if (data.statusCode !== 200 && !data.data) return { user: null };

  return data.data;
}

/**
 * Server-side: get the user from cookies.
 * - Reads access token
 * - Calls /auth/me
 * - Returns AuthUserResponse or null
 *
 * NOTE: This version does NOT refresh the token on the server.
 * If token is expired, you'll get null and can redirect to login.
 * The client AuthProvider can still handle refresh logic.
 */
export async function getAuthUserServer(): Promise<AuthUserResponse> {
  const { accessToken } = await getTokensFromCookies();
  if (!accessToken) return { user: null };

  try {
    const response = await fetchAuthUserWithToken(accessToken);
    return response;
  } catch {
    return { user: null };
  }
}
