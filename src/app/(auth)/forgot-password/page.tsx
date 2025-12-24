import type { Metadata } from 'next';
import Link from 'next/link';

import { ForgotPasswordForm } from './_components/forgot-password-form';

export const metadata: Metadata = {
  title: 'Admin Password Recovery - Priceforte',
  description: 'Recover your administrator account password',
};

export default function AdminForgotPasswordPage() {
  return (
    <div className='min-h-screen relative overflow-hidden bg-gradient-to-br from-slate-900 via-emerald-900 to-slate-900'>
      {/* Animated Background Elements */}
      <div className='absolute inset-0'>
        {/* Floating Blobs */}
        <div className='absolute top-1/4 left-1/4 w-64 h-64 bg-purple-500/20 rounded-full blur-3xl animate-blob'></div>
        <div className='absolute top-1/3 right-1/4 w-72 h-72 bg-emerald-500/20 rounded-full blur-3xl animate-blob animation-delay-2000'></div>
        <div className='absolute bottom-1/4 left-1/3 w-80 h-80 bg-blue-500/20 rounded-full blur-3xl animate-blob animation-delay-4000'></div>

        {/* Pattern Overlay */}
        <div
          className='absolute inset-0 opacity-20'
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fillRule='evenodd'%3E%3Cg fill='%239C92AC' fillOpacity='0.05'%3E%3Ccircle cx='30' cy='30' r='4'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
          }}
        ></div>
      </div>

      {/* Main Content */}
      <div className='relative z-10 flex items-center justify-center min-h-screen p-4'>
        <div className='w-full max-w-md'>
          {/* Glass Card */}
          <div className='backdrop-blur-xl bg-white/10 border border-white/20 rounded-2xl shadow-2xl p-8'>
            {/* Header */}
            <div className='text-center mb-8'>
              {/* Admin Badge */}
              <div className='inline-flex items-center gap-2 bg-gradient-to-r from-slate-500 to-emerald-500 text-white px-4 py-2 rounded-full text-sm font-medium mb-4'>
                <svg
                  className='w-4 h-4'
                  fill='currentColor'
                  viewBox='0 0 20 20'
                >
                  <path
                    fillRule='evenodd'
                    d='M2.166 4.999A11.954 11.954 0 0010 1.944 11.954 11.954 0 0017.834 5c.11.65.166 1.32.166 2.001 0 5.225-3.34 9.67-8 11.317C5.34 16.67 2 12.225 2 7c0-.682.057-1.35.166-2.001zm11.541 3.708a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z'
                    clipRule='evenodd'
                  />
                </svg>
                Administrator Recovery
              </div>

              {/* Logo */}
              <div className='mb-6'>
                <h1 className='text-3xl font-bold bg-gradient-to-r from-emerald-400 to-emerald-600 bg-clip-text text-transparent'>
                  Priceforte
                </h1>
                <p className='text-white/70 text-sm mt-1'>
                  Admin Password Recovery
                </p>
              </div>

              <h2 className='text-2xl font-bold text-white mb-2'>
                Recover Your Account
              </h2>
              <p className='text-white/70 text-sm'>
                Enter your admin email to receive password recovery instructions
              </p>
            </div>

            {/* Form */}
            <ForgotPasswordForm />

            {/* Footer Links */}
            <div className='mt-8 text-center space-y-3'>
              <div className='flex items-center justify-center gap-4 text-sm'>
                <Link
                  href='/login'
                  className='text-white/70 hover:text-white transition-colors duration-200 flex items-center gap-1'
                >
                  <svg
                    className='w-4 h-4'
                    fill='none'
                    stroke='currentColor'
                    viewBox='0 0 24 24'
                  >
                    <path
                      strokeLinecap='round'
                      strokeLinejoin='round'
                      strokeWidth={2}
                      d='M10 19l-7-7m0 0l7-7m-7 7h18'
                    />
                  </svg>
                  Back to Admin Login
                </Link>
              </div>

              <div className='pt-4 border-t border-white/10'>
                <p className='text-white/50 text-xs'>
                  Need help? Contact system administrator
                </p>
              </div>
            </div>
          </div>

          {/* Security Notice */}
          <div className='mt-6 backdrop-blur-xl bg-white/5 border border-white/10 rounded-xl p-4'>
            <div className='flex items-start gap-3'>
              <div className='flex-shrink-0'>
                <svg
                  className='w-5 h-5 text-amber-400 mt-0.5'
                  fill='currentColor'
                  viewBox='0 0 20 20'
                >
                  <path
                    fillRule='evenodd'
                    d='M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z'
                    clipRule='evenodd'
                  />
                </svg>
              </div>
              <div>
                <h3 className='text-white font-medium text-sm mb-1'>
                  Security Notice
                </h3>
                <p className='text-white/70 text-xs leading-relaxed'>
                  Password recovery requests are logged and monitored. Only
                  authorized administrators can access this system.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
