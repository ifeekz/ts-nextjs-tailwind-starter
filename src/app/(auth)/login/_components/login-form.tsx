'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { Eye, EyeOff, Loader2, Lock, Shield, User } from 'lucide-react';
import { useState } from 'react';
import { useForm } from 'react-hook-form';

import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';

import { AdminLoginFormValues, adminLoginSchema, useLogin } from '../_schema';

export function AdminLoginForm() {
  const [showPassword, setShowPassword] = useState(false);
  // const [showAdminCode, setShowAdminCode] = useState(false);
  const { submit, isPending: isLoading } = useLogin();

  const form = useForm<AdminLoginFormValues>({
    resolver: zodResolver(adminLoginSchema),
    defaultValues: {
      email: '',
      password: '',
      // adminCode: '',
    },
  });

  async function onSubmit(data: AdminLoginFormValues) {
    submit(data);
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-6'>
        <FormField
          control={form.control}
          name='email'
          render={({ field }) => (
            <FormItem>
              <FormLabel className='text-white font-medium'>
                Admin Email
              </FormLabel>
              <FormControl>
                <div className='relative'>
                  <User className='absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-purple-300' />
                  <Input
                    placeholder='admin@pricefort.com'
                    className='pl-10 bg-white/10 border-white/20 text-white placeholder:text-purple-200 focus:border-emerald-400 focus:ring-emerald-400/20'
                    {...field}
                  />
                </div>
              </FormControl>
              <FormMessage className='text-pink-300' />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name='password'
          render={({ field }) => (
            <FormItem>
              <FormLabel className='text-white font-medium'>Password</FormLabel>
              <FormControl>
                <div className='relative'>
                  <Lock className='absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-purple-300' />
                  <Input
                    type={showPassword ? 'text' : 'password'}
                    placeholder='••••••••'
                    className='pl-10 pr-10 bg-white/10 border-white/20 text-white placeholder:text-purple-200 focus:border-emerald-400 focus:ring-emerald-400/20'
                    {...field}
                  />
                  <Button
                    type='button'
                    variant='ghost'
                    size='sm'
                    className='absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent text-purple-300 hover:text-white'
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? (
                      <EyeOff className='h-4 w-4' />
                    ) : (
                      <Eye className='h-4 w-4' />
                    )}
                    <span className='sr-only'>
                      {showPassword ? 'Hide password' : 'Show password'}
                    </span>
                  </Button>
                </div>
              </FormControl>
              <FormMessage className='text-pink-300' />
            </FormItem>
          )}
        />

        {/* <FormField
          control={form.control}
          name='adminCode'
          render={({ field }) => (
            <FormItem>
              <FormLabel className='text-white font-medium'>
                Admin Access Code
              </FormLabel>
              <FormControl>
                <div className='relative'>
                  <Shield className='absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-purple-300' />
                  <Input
                    type={showAdminCode ? 'text' : 'password'}
                    placeholder='Enter admin code'
                    className='pl-10 pr-10 bg-white/10 border-white/20 text-white placeholder:text-purple-200 focus:border-emerald-400 focus:ring-emerald-400/20'
                    {...field}
                  />
                  <Button
                    type='button'
                    variant='ghost'
                    size='sm'
                    className='absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent text-purple-300 hover:text-white'
                    onClick={() => setShowAdminCode(!showAdminCode)}
                  >
                    {showAdminCode ? (
                      <EyeOff className='h-4 w-4' />
                    ) : (
                      <Eye className='h-4 w-4' />
                    )}
                    <span className='sr-only'>
                      {showAdminCode ? 'Hide admin code' : 'Show admin code'}
                    </span>
                  </Button>
                </div>
              </FormControl>
              <FormMessage className='text-pink-300' />
            </FormItem>
          )}
        /> */}

        <Button
          type='submit'
          className='w-full bg-linear-to-r from-emerald-500 to-emerald-600 hover:from-emerald-600 hover:to-emerald-700 text-white font-medium py-3 rounded-lg shadow-lg hover:shadow-xl transition-all duration-200 cursor-pointer'
          disabled={isLoading}
        >
          {isLoading ? (
            <>
              <Loader2 className='mr-2 h-4 w-4 animate-spin' />
              Verifying Access...
            </>
          ) : (
            <>
              <Shield className='mr-2 h-4 w-4' />
              Access Admin Dashboard
            </>
          )}
        </Button>

        {/* Security Features */}
        <div className='mt-6 p-4 bg-white/5 rounded-lg border border-white/10'>
          <div className='flex items-center gap-2 text-xs text-purple-200 mb-2'>
            <Shield className='h-3 w-3' />
            <span className='font-medium'>Enhanced Security</span>
          </div>
          <ul className='text-xs text-purple-300 space-y-1'>
            <li>• Two-factor authentication required</li>
            <li>• Session monitoring enabled</li>
            <li>• IP address verification active</li>
          </ul>
        </div>
      </form>
    </Form>
  );
}
