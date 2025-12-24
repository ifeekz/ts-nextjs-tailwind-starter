'use client';

import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Variant } from '@/types/product';

interface ProductVariantSelectorProps {
  variants: Variant[];
  selectedVariant: Variant | null;
  onSelectVariant: (variant: Variant) => void;
}

export function ProductVariantSelector({
  variants,
  selectedVariant,
  onSelectVariant,
}: ProductVariantSelectorProps) {
  return (
    <div className='space-y-4'>
      <div>
        <h3 className='text-sm font-medium'>Size</h3>
        <RadioGroup
          defaultValue={selectedVariant?.sku || ''}
          className='mt-2 flex flex-wrap gap-2'
          onValueChange={(value) => {
            const variant = variants.find((v) => v.sku === value);
            if (variant) onSelectVariant(variant);
          }}
        >
          {variants.map((variant) => (
            <div key={variant.sku} className='flex items-center space-x-2'>
              <RadioGroupItem
                value={variant.sku || ''}
                id={variant.sku}
                className='peer sr-only'
                aria-label={variant.sku}
              />
              <Label
                htmlFor={variant.sku}
                className='flex h-10 w-16 cursor-pointer items-center justify-center rounded-md border border-muted bg-transparent text-center text-sm font-medium ring-offset-background transition-colors hover:bg-muted focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 peer-data-[state=checked]:border-primary peer-data-[state=checked]:bg-primary/10 peer-data-[state=checked]:text-primary'
              >
                {variant.option1 || 'Default'}
              </Label>
            </div>
          ))}
        </RadioGroup>
      </div>
    </div>
  );
}
