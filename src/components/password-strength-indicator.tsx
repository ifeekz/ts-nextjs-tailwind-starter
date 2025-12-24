'use client';

import { useEffect, useState } from 'react';

interface PasswordStrengthIndicatorProps {
  password: string;
}

export function PasswordStrengthIndicator({
  password,
}: PasswordStrengthIndicatorProps) {
  const [strength, setStrength] = useState(0);

  useEffect(() => {
    let currentStrength = 0;

    if (!password) {
      setStrength(0);
      return;
    }

    // Length check
    if (password.length >= 8) currentStrength += 1;

    // Uppercase check
    if (/[A-Z]/.test(password)) currentStrength += 1;

    // Lowercase check
    if (/[a-z]/.test(password)) currentStrength += 1;

    // Number check
    if (/[0-9]/.test(password)) currentStrength += 1;

    // Special character check
    if (/[^A-Za-z0-9]/.test(password)) currentStrength += 1;

    setStrength(currentStrength);
  }, [password]);

  if (!password) return null;

  return (
    <div className='mt-2 space-y-2'>
      <div className='flex gap-1 h-1.5'>
        <div
          className={`h-full flex-1 rounded-full transition-colors ${
            strength >= 1 ? 'bg-red-500' : 'bg-gray-200'
          }`}
        />
        <div
          className={`h-full flex-1 rounded-full transition-colors ${
            strength >= 2 ? 'bg-orange-500' : 'bg-gray-200'
          }`}
        />
        <div
          className={`h-full flex-1 rounded-full transition-colors ${
            strength >= 3 ? 'bg-yellow-500' : 'bg-gray-200'
          }`}
        />
        <div
          className={`h-full flex-1 rounded-full transition-colors ${
            strength >= 4 ? 'bg-lime-500' : 'bg-gray-200'
          }`}
        />
        <div
          className={`h-full flex-1 rounded-full transition-colors ${
            strength >= 5 ? 'bg-emerald-500' : 'bg-gray-200'
          }`}
        />
      </div>
      <p className='text-xs text-gray-500'>
        {strength === 0 && 'Enter a password'}
        {strength === 1 && 'Very weak'}
        {strength === 2 && 'Weak'}
        {strength === 3 && 'Medium'}
        {strength === 4 && 'Strong'}
        {strength === 5 && 'Very strong'}
      </p>
    </div>
  );
}
