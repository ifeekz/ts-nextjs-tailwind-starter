'use client';

import { Minus, Plus } from 'lucide-react';
import type React from 'react';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

interface ProductQuantitySelectorProps {
  quantity: number;
  onQuantityChange: (quantity: number) => void;
  max?: number;
}

export function ProductQuantitySelector({
  quantity,
  onQuantityChange,
  max = 99,
}: ProductQuantitySelectorProps) {
  const handleDecrease = () => {
    if (quantity > 1) {
      onQuantityChange(quantity - 1);
    }
  };

  const handleIncrease = () => {
    if (quantity < max) {
      onQuantityChange(quantity + 1);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = Number.parseInt(e.target.value);
    if (!Number.isNaN(value) && value >= 1 && value <= max) {
      onQuantityChange(value);
    }
  };

  return (
    <div className='space-y-2'>
      <h3 className='text-sm font-medium'>Quantity</h3>
      <div className='flex w-full max-w-[160px] items-center'>
        <Button
          variant='outline'
          size='icon'
          className='h-10 w-10 rounded-r-none'
          onClick={handleDecrease}
          disabled={quantity <= 1}
        >
          <Minus className='h-4 w-4' />
          <span className='sr-only'>Decrease quantity</span>
        </Button>
        <Input
          type='number'
          min={1}
          max={max}
          className='h-10 rounded-none border-x-0 text-center [appearance:textfield] [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none'
          value={quantity}
          onChange={handleChange}
        />
        <Button
          variant='outline'
          size='icon'
          className='h-10 w-10 rounded-l-none'
          onClick={handleIncrease}
          disabled={quantity >= max}
        >
          <Plus className='h-4 w-4' />
          <span className='sr-only'>Increase quantity</span>
        </Button>
      </div>
    </div>
  );
}
