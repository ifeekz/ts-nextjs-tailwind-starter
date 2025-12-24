'use client';

import {
  AlertCircle,
  CheckCircle,
  Eye,
  EyeOff,
  Loader2,
  Lock,
  Shield,
} from 'lucide-react';
import type React from 'react';
import { useState } from 'react';
import { toast } from 'sonner';
import { z } from 'zod';

import { PasswordStrengthIndicator } from '@/components/password-strength-indicator';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

const resetPasswordSchema = z
  .object({
    password: z
      .string()
      .min(8, 'Password must be at least 8 characters')
      .regex(/[A-Z]/, 'Password must contain at least one uppercase letter')
      .regex(/[a-z]/, 'Password must contain at least one lowercase letter')
      .regex(/[0-9]/, 'Password must contain at least one number')
      .regex(
        /[^A-Za-z0-9]/,
        'Password must contain at least one special character',
      ),
    confirmPassword: z.string(),
    adminCode: z.string().min(1, 'Admin verification code is required'),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords don't match",
    path: ['confirmPassword'],
  });

type ResetPasswordData = z.infer<typeof resetPasswordSchema>;

export function AdminResetPasswordForm() {
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [formData, setFormData] = useState<ResetPasswordData>({
    password: '',
    confirmPassword: '',
    adminCode: '',
  });
  const [errors, setErrors] = useState<Partial<ResetPasswordData>>({});

  const handleInputChange = (field: keyof ResetPasswordData, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    // Clear error when user starts typing
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: undefined }));
    }
  };

  const validateForm = (): boolean => {
    try {
      resetPasswordSchema.parse(formData);
      setErrors({});
      return true;
    } catch (error) {
      if (error instanceof z.ZodError) {
        const newErrors: Partial<ResetPasswordData> = {};
        error.errors.forEach((err) => {
          if (err.path[0]) {
            newErrors[err.path[0] as keyof ResetPasswordData] = err.message;
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

      // Check admin code (demo purposes)
      if (formData.adminCode !== 'RESET123') {
        toast('The admin verification code is incorrect.');
        return;
      }

      setIsSuccess(true);
      toast('Your admin password has been updated successfully.');
    } catch (error) {
      toast('Failed to reset password. Please try again.');
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
            Password Reset Complete
          </h3>
          <p className='text-white/70 text-sm leading-relaxed'>
            Your administrator password has been successfully updated. You can
            now log in with your new password.
          </p>
        </div>

        <div className='bg-white/5 border border-white/10 rounded-lg p-4'>
          <div className='flex items-start gap-3'>
            <Shield className='w-5 h-5 text-green-400 flex-shrink-0 mt-0.5' />
            <div className='text-left'>
              <p className='text-white/70 text-sm'>
                <strong>Security Recommendations:</strong>
              </p>
              <ul className='text-white/60 text-xs mt-2 space-y-1'>
                <li>• Keep your password secure and confidential</li>
                <li>• Enable two-factor authentication if available</li>
                <li>• Log out from shared devices</li>
                <li>• Change password regularly</li>
              </ul>
            </div>
          </div>
        </div>

        <Button
          onClick={() => (window.location.href = '/admin/login')}
          className='w-full bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white font-medium py-3'
        >
          Continue to Admin Login
        </Button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className='space-y-6'>
      {/* New Password Field */}
      <div className='space-y-2'>
        <Label htmlFor='password' className='text-white font-medium'>
          New Password
        </Label>
        <div className='relative'>
          <Lock className='absolute left-3 top-1/2 transform -translate-y-1/2 text-white/50 w-5 h-5' />
          <Input
            id='password'
            type={showPassword ? 'text' : 'password'}
            placeholder='Enter new password'
            value={formData.password}
            onChange={(e) => handleInputChange('password', e.target.value)}
            className='pl-10 pr-10 bg-white/10 border-white/20 text-white placeholder:text-white/50 focus:border-purple-400 focus:ring-purple-400/20'
            disabled={isLoading}
          />
          <button
            type='button'
            onClick={() => setShowPassword(!showPassword)}
            className='absolute right-3 top-1/2 transform -translate-y-1/2 text-white/50 hover:text-white/70 transition-colors'
          >
            {showPassword ? (
              <EyeOff className='w-5 h-5' />
            ) : (
              <Eye className='w-5 h-5' />
            )}
          </button>
        </div>
        {formData.password && (
          <PasswordStrengthIndicator password={formData.password} />
        )}
        {errors.password && (
          <p className='text-red-400 text-sm flex items-center gap-1'>
            <AlertCircle className='w-4 h-4' />
            {errors.password}
          </p>
        )}
      </div>

      {/* Confirm Password Field */}
      <div className='space-y-2'>
        <Label htmlFor='confirmPassword' className='text-white font-medium'>
          Confirm New Password
        </Label>
        <div className='relative'>
          <Lock className='absolute left-3 top-1/2 transform -translate-y-1/2 text-white/50 w-5 h-5' />
          <Input
            id='confirmPassword'
            type={showConfirmPassword ? 'text' : 'password'}
            placeholder='Confirm new password'
            value={formData.confirmPassword}
            onChange={(e) =>
              handleInputChange('confirmPassword', e.target.value)
            }
            className='pl-10 pr-10 bg-white/10 border-white/20 text-white placeholder:text-white/50 focus:border-purple-400 focus:ring-purple-400/20'
            disabled={isLoading}
          />
          <button
            type='button'
            onClick={() => setShowConfirmPassword(!showConfirmPassword)}
            className='absolute right-3 top-1/2 transform -translate-y-1/2 text-white/50 hover:text-white/70 transition-colors'
          >
            {showConfirmPassword ? (
              <EyeOff className='w-5 h-5' />
            ) : (
              <Eye className='w-5 h-5' />
            )}
          </button>
        </div>
        {errors.confirmPassword && (
          <p className='text-red-400 text-sm flex items-center gap-1'>
            <AlertCircle className='w-4 h-4' />
            {errors.confirmPassword}
          </p>
        )}
      </div>

      {/* Admin Verification Code */}
      <div className='space-y-2'>
        <Label htmlFor='adminCode' className='text-white font-medium'>
          Admin Verification Code
        </Label>
        <div className='relative'>
          <Shield className='absolute left-3 top-1/2 transform -translate-y-1/2 text-white/50 w-5 h-5' />
          <Input
            id='adminCode'
            type='text'
            placeholder='Enter verification code'
            value={formData.adminCode}
            onChange={(e) => handleInputChange('adminCode', e.target.value)}
            className='pl-10 bg-white/10 border-white/20 text-white placeholder:text-white/50 focus:border-purple-400 focus:ring-purple-400/20'
            disabled={isLoading}
          />
        </div>
        <p className='text-white/60 text-xs'>
          Enter the verification code from your recovery email
        </p>
        {errors.adminCode && (
          <p className='text-red-400 text-sm flex items-center gap-1'>
            <AlertCircle className='w-4 h-4' />
            {errors.adminCode}
          </p>
        )}
      </div>

      {/* Submit Button */}
      <Button
        type='submit'
        disabled={isLoading}
        className='w-full bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white font-medium py-3 transition-all duration-200 transform hover:scale-[1.02]'
      >
        {isLoading ? (
          <>
            <Loader2 className='w-4 h-4 mr-2 animate-spin' />
            Resetting Password...
          </>
        ) : (
          <>
            <Shield className='w-4 h-4 mr-2' />
            Reset Password
          </>
        )}
      </Button>

      {/* Security Requirements */}
      <div className='bg-white/5 border border-white/10 rounded-lg p-4'>
        <div className='flex items-start gap-3'>
          <AlertCircle className='w-5 h-5 text-blue-400 flex-shrink-0 mt-0.5' />
          <div>
            <h4 className='text-white font-medium text-sm mb-1'>
              Password Requirements
            </h4>
            <ul className='text-white/70 text-xs space-y-1'>
              <li>• At least 8 characters long</li>
              <li>• Contains uppercase and lowercase letters</li>
              <li>• Contains at least one number</li>
              <li>• Contains at least one special character</li>
            </ul>
          </div>
        </div>
      </div>
    </form>
  );
}
