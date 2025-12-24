import { useMutation } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';
import z from 'zod';

import { useAuth } from '@/context/auth-context';
import { login as loginService } from '@/services/auth';

const adminLoginSchema = z.object({
  email: z.string().email({ message: 'Please enter a valid email address' }),
  password: z
    .string()
    .min(8, { message: 'Password must be at least 8 characters' }),
  //   adminCode: z
  //     .string()
  //     .min(6, { message: 'Admin code must be at least 6 characters' }),
});

type AdminLoginFormValues = z.infer<typeof adminLoginSchema>;

export { type AdminLoginFormValues, adminLoginSchema };

export const useLogin = () => {
  const router = useRouter();
  const { login } = useAuth();

  const mutation = useMutation({
    mutationFn: loginService,
    onError: (error: any) => {
      toast.error(error?.response?.data?.message ?? 'Login failed', {
        richColors: true,
      });
    },
  });

  const submit = (data: AdminLoginFormValues) =>
    mutation.mutate(data, {
      onSuccess: ({ success, message, data }) => {
        toast.dismiss();
        if (success && data && data.accessToken) {
          login(data.accessToken, data.refreshToken);
          toast.success(message ?? 'Login successful', {
            richColors: true,
          });
          router.push('/');
        } else {
          toast.error(message ?? 'Unable to login! Please try again.', {
            richColors: true,
          });
        }
      },
    });

  return {
    ...mutation,
    submit,
  };
};
