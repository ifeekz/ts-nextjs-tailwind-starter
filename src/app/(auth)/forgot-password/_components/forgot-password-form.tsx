'use client';

import { AlertCircle, CheckCircle, Loader2, Mail } from 'lucide-react';
import type React from 'react';
import { useState } from 'react';
import { toast } from 'sonner';
import { z } from 'zod';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

const forgotPasswordSchema = z.object({
  email: z.string().email('Please enter a valid admin email address'),
});

type ForgotPasswordData = z.infer<typeof forgotPasswordSchema>;

export function ForgotPasswordForm() {
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [formData, setFormData] = useState<ForgotPasswordData>({
    email: '',
  });
  const [errors, setErrors] = useState<Partial<ForgotPasswordData>>({});

  const handleInputChange = (
    field: keyof ForgotPasswordData,
    value: string,
  ) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    // Clear error when user starts typing
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: undefined }));
    }
  };

  const validateForm = (): boolean => {
    try {
      forgotPasswordSchema.parse(formData);
      setErrors({});
      return true;
    } catch (error) {
      if (error instanceof z.ZodError) {
        const newErrors: Partial<ForgotPasswordData> = {};
        error.errors.forEach((err) => {
          if (err.path[0]) {
            newErrors[err.path[0] as keyof ForgotPasswordData] = err.message;
          }
        });
        setErrors(newErrors);
      }
      return false;
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    setIsLoading(true);

    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 2000));

      // Check if it's a valid admin email (demo purposes)
      const validAdminEmails = [
        'admin@pricesmach.com',
        'support@pricesmach.com',
        'system@pricesmach.com',
      ];

      if (!validAdminEmails.includes(formData.email)) {
        toast('This email is not registered as an administrator account.');
        return;
      }

      setIsSuccess(true);
      toast('Check your email for password recovery instructions.');
    } catch (error) {
      toast('Failed to send recovery email. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  if (isSuccess) {
    return (
      <div className='text-center space-y-6'>
        <div className='flex justify-center'>
          <div className='w-16 h-16 bg-green-500/20 rounded-full flex items-center justify-center'>
            <CheckCircle className='w-8 h-8 text-green-400' />
          </div>
        </div>

        <div>
          <h3 className='text-xl font-semibold text-white mb-2'>
            Recovery Email Sent
          </h3>
          <p className='text-white/70 text-sm leading-relaxed'>
            We've sent password recovery instructions to{' '}
            <strong>{formData.email}</strong>. Please check your email and
            follow the instructions to reset your password.
          </p>
        </div>

        <div className='bg-white/5 border border-white/10 rounded-lg p-4'>
          <div className='flex items-start gap-3'>
            <AlertCircle className='w-5 h-5 text-amber-400 flex-shrink-0 mt-0.5' />
            <div className='text-left'>
              <p className='text-white/70 text-sm'>
                <strong>Didn't receive the email?</strong>
              </p>
              <ul className='text-white/60 text-xs mt-2 space-y-1'>
                <li>• Check your spam/junk folder</li>
                <li>• Ensure the email address is correct</li>
                <li>• Contact system administrator if needed</li>
              </ul>
            </div>
          </div>
        </div>

        <Button
          onClick={() => {
            setIsSuccess(false);
            setFormData({ email: '' });
          }}
          variant='outline'
          className='w-full bg-white/10 border-white/20 text-white hover:bg-white/20'
        >
          Send Another Email
        </Button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className='space-y-6'>
      {/* Email Field */}
      <div className='space-y-2'>
        <Label htmlFor='email' className='text-white font-medium'>
          Admin Email Address
        </Label>
        <div className='relative'>
          <Mail className='absolute left-3 top-1/2 transform -translate-y-1/2 text-white/50 w-5 h-5' />
          <Input
            id='email'
            type='email'
            placeholder='admin@pricesmach.com'
            value={formData.email}
            onChange={(e) => handleInputChange('email', e.target.value)}
            className='pl-10 bg-white/10 border-white/20 text-white placeholder:text-white/50 focus:border-purple-400 focus:ring-purple-400/20'
            disabled={isLoading}
          />
        </div>
        {errors.email && (
          <p className='text-red-400 text-sm flex items-center gap-1'>
            <AlertCircle className='w-4 h-4' />
            {errors.email}
          </p>
        )}
      </div>

      {/* Submit Button */}
      <Button
        type='submit'
        disabled={isLoading}
        className='w-full bg-gradient-to-r from-emerald-500 to-emerald-600 hover:from-emerald-600 hover:to-emerald-700 text-white font-medium py-3 transition-all duration-200 transform hover:scale-[1.02]'
      >
        {isLoading ? (
          <>
            <Loader2 className='w-4 h-4 mr-2 animate-spin' />
            Sending Recovery Email...
          </>
        ) : (
          <>
            <Mail className='w-4 h-4 mr-2' />
            Send Recovery Email
          </>
        )}
      </Button>

      {/* Help Text */}
      <div className='bg-white/5 border border-white/10 rounded-lg p-4'>
        <div className='flex items-start gap-3'>
          <AlertCircle className='w-5 h-5 text-blue-400 flex-shrink-0 mt-0.5' />
          <div>
            <h4 className='text-white font-medium text-sm mb-1'>
              Recovery Process
            </h4>
            <ul className='text-white/70 text-xs space-y-1'>
              <li>• Enter your registered admin email address</li>
              <li>• Check your email for recovery instructions</li>
              <li>• Follow the secure link to reset your password</li>
              <li>• Create a new strong password</li>
            </ul>
          </div>
        </div>
      </div>
    </form>
  );
}
