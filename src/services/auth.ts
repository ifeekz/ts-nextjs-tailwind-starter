import axios from 'axios';

import api from '@/lib/axios';
import type { User } from '@/types';
import type { IApiResponse } from '@/types/api';

export interface registerPayload {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
}

export interface LoginPayload {
  email: string;
  password: string;
}

export interface LoginResponse {
  user: User;
  accessToken: string;
  refreshToken: string;
  hasStore: boolean;
  otpToken?: string;
}

export interface OtpResponse {
  otpToken: string;
}

export interface EmailPayload {
  email: string;
}

export interface PasswordPayload {
  password: string;
}

export type ForgotPasswordPayload = EmailPayload & {
  locale: string;
};

export interface SignedUrlParams {
  signature: string;
  expires: string;
}

export const register = async (
  payload: registerPayload,
): Promise<IApiResponse<LoginResponse>> => {
  const { data } = await axios.post<IApiResponse<LoginResponse>>(
    `${process.env.NEXT_PUBLIC_API_URL}/auth/register`,
    payload,
  );
  return data;
};

export const verifyEmail = async (payload: {
  otpCode: string;
  token: string;
}): Promise<IApiResponse<User | null>> => {
  const { data } = await api.post<IApiResponse<User | null>>(
    `${process.env.NEXT_PUBLIC_API_URL}/auth/verify-email`,
    payload,
  );
  return data;
};

export const resendOtp = async (
  email: string,
): Promise<IApiResponse<OtpResponse | null>> => {
  const { data } = await api.post<IApiResponse<OtpResponse | null>>(
    `${process.env.NEXT_PUBLIC_API_URL}/auth/resend-otp`,
    { email },
  );
  return data;
};

export const login = async (
  payload: LoginPayload,
): Promise<IApiResponse<LoginResponse>> => {
  const { data } = await axios.post<IApiResponse<LoginResponse>>(
    `${process.env.NEXT_PUBLIC_API_URL}/auth/login`,
    payload,
  );
  return data;
};

export const forgotPassword = async (
  payload: ForgotPasswordPayload,
): Promise<IApiResponse<null>> => {
  const { data } = await axios.post<IApiResponse<null>>(
    `${process.env.NEXT_PUBLIC_API_URL}/auth/forgot-password`,
    payload,
  );
  return data;
};

export const resetPassword = async (
  payload: PasswordPayload,
  params: SignedUrlParams & { email: string },
): Promise<IApiResponse<null>> => {
  const query = new URLSearchParams({
    email: params.email,
    signature: params.signature,
    expires: params.expires,
  }).toString();

  const { data } = await axios.post<IApiResponse<null>>(
    `${process.env.NEXT_PUBLIC_API_URL}/auth/reset-password?${query}`,
    payload,
  );
  return data;
};
