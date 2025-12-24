'use client';

import axios from 'axios';
import Cookies from 'js-cookie';
// import { useRouter } from 'nextjs-toploader/app';
import { useRouter } from 'next/navigation';
import { createContext, useContext, useEffect, useState } from 'react';
import { toast } from 'sonner';

import type { AuthUserResponse, IAuthTokens, User } from '@/types';
import type { IApiResponse } from '@/types/api';
interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  hasOnboarded: boolean;
  loading: boolean;
  login: (
    accessToken: string,
    refreshToken: string,
    message?: string,
  ) => Promise<void>;
  logout: (message?: string) => void;
  checkAuth: () => Promise<void>;
  resetUser: (user: User | null) => void;
  hasRole: (role: string) => boolean;
  hasAnyRole: (roles: string[]) => boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const router = useRouter();
  const COOKIE_DOMAIN = `.${process.env.NEXT_PUBLIC_DOMAIN}`; // leading dot is important

  const refreshAccessToken = async () => {
    const refreshToken = Cookies.get('refresh_token');
    if (!refreshToken) {
      logout('Your session have expired');
      return;
    }

    try {
      const { data } = await axios.post<IApiResponse<IAuthTokens>>(
        `${process.env.NEXT_PUBLIC_API_URL}/auth/refresh-token`,
        { refreshToken },
      );
      if (data?.data?.accessToken) {
        Cookies.set('access_token', data.data.accessToken, {
          domain: COOKIE_DOMAIN,
          path: '/',
          secure: true, // use only over HTTPS (ngrok or real TLS)
          sameSite: 'lax',
          expires: 7,
        });
        Cookies.set('refresh_token', data.data.refreshToken, {
          domain: COOKIE_DOMAIN,
          path: '/',
          secure: true, // use only over HTTPS (ngrok or real TLS)
          sameSite: 'lax',
          expires: 14,
        });
        // toast.info('Access token refreshed');
      } else {
        logout('Your session have expired');
      }
    } catch (error) {
      logout('Your session have expired');
    }
  };

  const checkAuth = async () => {
    const token = Cookies.get('access_token');
    if (!token) {
      setUser(null);
      setLoading(false);
      return;
    }

    try {
      const { data } = await axios.get<IApiResponse<AuthUserResponse>>(
        `${process.env.NEXT_PUBLIC_API_URL}/auth/me`,
        {
          headers: { Authorization: `Bearer ${token}` },
        },
      );

      if (data.statusCode === 200 && data.data) {
        setUser(data.data.user);
      }
      // biome-ignore lint/suspicious/noExplicitAny: <explanation>
    } catch (error: any) {
      if (error.response?.status === 401) {
        await refreshAccessToken();
        return checkAuth();
      }
      setUser(null);
      Cookies.remove('access_token');
      Cookies.remove('refresh_token');
    } finally {
      setLoading(false);
    }
  };

  const resetUser = (user: User | null) => {
    setUser(user);
  };

  const login = async (
    accessToken: string,
    refreshToken: string,
    message?: string,
  ) => {
    Cookies.set('access_token', accessToken, {
      domain: COOKIE_DOMAIN,
      path: '/',
      secure: true, // use only over HTTPS (ngrok or real TLS)
      sameSite: 'lax',
      expires: 7,
    });
    Cookies.set('refresh_token', refreshToken, {
      domain: COOKIE_DOMAIN,
      path: '/',
      secure: true, // use only over HTTPS (ngrok or real TLS)
      sameSite: 'lax',
      expires: 14,
    });
    await checkAuth();
  };

  const logout = (message?: string) => {
    Cookies.remove('access_token', { domain: COOKIE_DOMAIN, path: '/' });
    Cookies.remove('refresh_token', { domain: COOKIE_DOMAIN, path: '/' });
    setUser(null);
    toast.dismiss();
    toast.success(message ?? 'Logged out successfully');
    router.push('/login');
  };

  const hasRole = (role: string) => {
    return user?.role === role;
  };

  const hasAnyRole = (roles: string[]) => {
    return false; // roles.some((role) => user?.roles?.includes(role));
  };

  // biome-ignore lint/correctness/useExhaustiveDependencies: <explanation>
  useEffect(() => {
    checkAuth();
  }, []);

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated: !!user,
        hasOnboarded: user ? user.hasOnboarded : false,
        loading,
        login,
        logout,
        checkAuth,
        resetUser,
        hasRole,
        hasAnyRole,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
