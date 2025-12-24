import type { Metadata } from 'next';
import Link from 'next/link';

import { AdminLoginForm } from './_components/login-form';

export const metadata: Metadata = {
  title: 'Admin Login | Priceforte',
  description: 'Admin access to Priceforte dashboard',
};

export default function AdminLoginPage() {
  return (
    <div className='min-h-screen bg-linear-to-br from-slate-900 via-emerald-900 to-slate-900 flex items-center justify-center p-4'>
      {/* Subtle dot pattern */}
      <div
        className='absolute inset-0 bg-no-repeat bg-center opacity-20'
        style={{
          backgroundImage:
            "url(\"data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fillRule='evenodd'%3E%3Cg fill='%239C92AC' fillOpacity='0.05'%3E%3Ccircle cx='30' cy='30' r='4'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E\")",
        }}
      />

      {/* Floating Elements */}
      <div className='absolute top-20 left-20 w-72 h-72 bg-purple-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob'></div>
      <div className='absolute top-40 right-20 w-72 h-72 bg-emerald-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob animation-delay-2000'></div>
      <div className='absolute -bottom-8 left-40 w-72 h-72 bg-pink-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob animation-delay-4000'></div>

      <div className='relative w-full max-w-md'>
        {/* Admin Badge */}
        <div className='text-center mb-8'>
          <div className='inline-flex items-center gap-2 px-4 py-2 bg-linear-to-r from-slate-600 to-emerald-600 rounded-full text-white text-sm font-medium shadow-lg'>
            <svg className='w-4 h-4' fill='currentColor' viewBox='0 0 20 20'>
              <path
                fillRule='evenodd'
                d='M18 8a6 6 0 01-7.743 5.743L10 14l-0.257-0.257A6 6 0 1118 8zM10 2a1 1 0 011 1v1.267a4.39 4.39 0 011.449.713l.898-.898a1 1 0 011.414 1.414l-.898.898a4.39 4.39 0 01.713 1.449H16a1 1 0 110 2h-1.267a4.39 4.39 0 01-.713 1.449l.898.898a1 1 0 01-1.414 1.414l-.898-.898A4.39 4.39 0 0111 11.267V12a1 1 0 11-2 0v-1.267a4.39 4.39 0 01-1.449-.713l-.898.898a1 1 0 01-1.414-1.414l.898-.898A4.39 4.39 0 014.267 8H3a1 1 0 110-2h1.267a4.39 4.39 0 01.713-1.449L4.082 3.653a1 1 0 011.414-1.414l.898.898A4.39 4.39 0 019 2.267V2a1 1 0 011-1zM10 6a2 2 0 100 4 2 2 0 000-4z'
                clipRule='evenodd'
              />
            </svg>
            Administrator Access
          </div>
        </div>

        {/* Main Card */}
        <div className='bg-white/10 backdrop-blur-lg rounded-2xl shadow-2xl border border-white/20 p-8'>
          {/* Header */}
          <div className='text-center mb-8'>
            <Link href='/' className='inline-flex items-center gap-3 mb-6'>
              <div className='w-12 h-12 bg-linear-to-br from-emerald-400 to-emerald-600 rounded-xl flex items-center justify-center shadow-lg'>
                <svg
                  className='w-6 h-6 text-white'
                  fill='none'
                  stroke='currentColor'
                  viewBox='0 0 24 24'
                >
                  <path
                    strokeLinecap='round'
                    strokeLinejoin='round'
                    strokeWidth={2}
                    d='M3 3h2l.4 2M7 13h10l4-8H5.4m0 0L7 13m0 0l-1.5 6M7 13l-1.5-6m0 0h15.5M17 13v6a2 2 0 01-2 2H9a2 2 0 01-2-2v-6'
                  />
                </svg>
              </div>
              <div>
                <span className='text-2xl font-bold text-white'>
                  Priceforte
                </span>
                <div className='text-xs text-purple-200 font-medium'>
                  Admin Portal
                </div>
              </div>
            </Link>

            <h1 className='text-3xl font-bold text-white mb-2'>Welcome Back</h1>
            <p className='text-purple-200'>
              Access your administrative dashboard
            </p>
          </div>

          {/* Login Form */}
          <AdminLoginForm />

          {/* Footer Links */}
          <div className='mt-8 pt-6 border-t border-white/10'>
            <div className='flex justify-between items-center text-sm'>
              <Link
                href='/login'
                className='text-purple-200 hover:text-white transition-colors'
              >
                ← User Login
              </Link>
              <Link
                href='/forgot-password'
                className='text-purple-200 hover:text-white transition-colors'
              >
                Forgot Password?
              </Link>
            </div>
          </div>
        </div>

        {/* Security Notice */}
        <div className='mt-6 text-center'>
          <p className='text-xs text-purple-200/80'>
            🔒 This is a secure administrative area. All activities are logged
            and monitored.
          </p>
        </div>
      </div>
    </div>
  );
}
