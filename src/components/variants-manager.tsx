'use client';

import { Plus, X } from 'lucide-react';
import { useState } from 'react';
import type { UseFormReturn } from 'react-hook-form';
import { z } from 'zod';

import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Separator } from '@/components/ui/separator';
import { Switch } from '@/components/ui/switch';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';

// This should match the schema in product-form.tsx
const productFormSchema = z.object({
  title: z.string().min(2).max(100),
  description: z.string().optional(),
  category: z.string(),
  status: z.enum(['draft', 'published']),
  price: z.coerce.number().min(0.01),
  compareAtPrice: z.coerce.number().optional(),
  costPerItem: z.coerce.number().optional(),
  sku: z.string().optional(),
  barcode: z.string().optional(),
  trackInventory: z.boolean().default(true),
  quantity: z.coerce.number().int().optional(),
  taxable: z.boolean().default(true),
  requiresShipping: z.boolean().default(true),
  variants: z
    .array(
      z.object({
        option1: z.string().optional(),
        option2: z.string().optional(),
        option3: z.string().optional(),
        price: z.coerce.number().optional(),
        sku: z.string().optional(),
        quantity: z.coerce.number().int().optional(),
      }),
    )
    .optional(),
  variantOptions: z
    .array(
      z.object({
        name: z.string(),
        values: z.array(z.string()),
      }),
    )
    .optional(),
});

type ProductFormValues = z.infer<typeof productFormSchema>;

interface VariantsManagerProps {
  form: UseFormReturn<ProductFormValues>;
}

export function VariantsManager({ form }: VariantsManagerProps) {
  const [hasVariants, setHasVariants] = useState(false);
  const [newOptionName, setNewOptionName] = useState('');
  const [newOptionValue, setNewOptionValue] = useState('');
  const [currentOption, setCurrentOption] = useState<number | null>(null);

  const variantOptions = form.watch('variantOptions') || [];

  const addOption = () => {
    if (newOptionName.trim() === '') return;

    const updatedOptions = [
      ...(form.getValues('variantOptions') || []),
      { name: newOptionName, values: [] },
    ];

    form.setValue('variantOptions', updatedOptions);
    setNewOptionName('');
    setCurrentOption(updatedOptions.length - 1);
  };

  const addOptionValue = () => {
    if (currentOption === null || newOptionValue.trim() === '') return;

    const updatedOptions = [...(form.getValues('variantOptions') || [])];
    updatedOptions[currentOption].values.push(newOptionValue);

    form.setValue('variantOptions', updatedOptions);
    setNewOptionValue('');

    // Generate variants when values are added
    generateVariants(updatedOptions);
  };

  const removeOption = (index: number) => {
    const updatedOptions = [...(form.getValues('variantOptions') || [])];
    updatedOptions.splice(index, 1);

    form.setValue('variantOptions', updatedOptions);
    if (currentOption === index) {
      setCurrentOption(null);
    } else if (currentOption !== null && currentOption > index) {
      setCurrentOption(currentOption - 1);
    }

    // Regenerate variants when an option is removed
    generateVariants(updatedOptions);
  };

  const removeOptionValue = (optionIndex: number, valueIndex: number) => {
    const updatedOptions = [...(form.getValues('variantOptions') || [])];
    updatedOptions[optionIndex].values.splice(valueIndex, 1);

    form.setValue('variantOptions', updatedOptions);

    // Regenerate variants when a value is removed
    generateVariants(updatedOptions);
  };

  const generateVariants = (options: { name: string; values: string[] }[]) => {
    if (!options.length) {
      form.setValue('variants', []);
      return;
    }

    // Get all option values
    const optionValues = options.map((option) => option.values);

    // Generate all combinations
    const generateCombinations = (
      arrays: string[][],
      current: string[] = [],
      index = 0,
    ): string[][] => {
      if (index === arrays.length) {
        return [current];
      }

      let result: string[][] = [];
      for (let i = 0; i < arrays[index].length; i++) {
        result = result.concat(
          generateCombinations(
            arrays,
            [...current, arrays[index][i]],
            index + 1,
          ),
        );
      }

      return result;
    };

    // Only generate variants if all options have at least one value
    if (optionValues.every((values) => values.length > 0)) {
      const combinations = generateCombinations(optionValues);

      // Create variant objects
      const variants = combinations.map((combo) => {
        const variant: any = {};

        // Add option values to variant
        options.forEach((option, index) => {
          if (index < combo.length) {
            variant[`option${index + 1}`] = combo[index];
          }
        });

        // Set default price from main product
        variant.price = form.getValues('price');
        variant.quantity = form.getValues('quantity') || 0;

        return variant;
      });

      form.setValue('variants', variants);
    }
  };

  const toggleVariants = (enabled: boolean) => {
    setHasVariants(enabled);
    if (!enabled) {
      form.setValue('variantOptions', []);
      form.setValue('variants', []);
    }
  };

  return (
    <div className='space-y-6'>
      <div className='flex items-center justify-between'>
        <div className='space-y-0.5'>
          <Label className='text-base'>Product has multiple options</Label>
          <p className='text-sm text-muted-foreground'>
            Like size, color, or material
          </p>
        </div>
        <Switch checked={hasVariants} onCheckedChange={toggleVariants} />
      </div>

      {hasVariants && (
        <>
          <Separator />

          <div className='space-y-4'>
            <div className='flex flex-wrap gap-2'>
              {variantOptions.map((option, index) => (
                <Badge
                  key={index}
                  variant={currentOption === index ? 'default' : 'outline'}
                  className='cursor-pointer'
                  onClick={() => setCurrentOption(index)}
                >
                  {option.name}
                  <Button
                    variant='ghost'
                    size='icon'
                    className='h-4 w-4 ml-1'
                    onClick={(e) => {
                      e.stopPropagation();
                      removeOption(index);
                    }}
                  >
                    <X className='h-3 w-3' />
                  </Button>
                </Badge>
              ))}

              {variantOptions.length < 3 && (
                <div className='flex items-center gap-2'>
                  <Input
                    placeholder='Option name (e.g. Size)'
                    value={newOptionName}
                    onChange={(e) => setNewOptionName(e.target.value)}
                    className='w-48'
                  />
                  <Button
                    variant='outline'
                    size='sm'
                    onClick={addOption}
                    disabled={!newOptionName.trim()}
                  >
                    <Plus className='h-4 w-4 mr-1' />
                    Add
                  </Button>
                </div>
              )}
            </div>

            {currentOption !== null && (
              <div className='border rounded-md p-4'>
                <h3 className='font-medium mb-2'>
                  {variantOptions[currentOption]?.name} values
                </h3>
                <div className='flex flex-wrap gap-2 mb-4'>
                  {variantOptions[currentOption]?.values.map(
                    (value, valueIndex) => (
                      <Badge
                        key={valueIndex}
                        variant='secondary'
                        className='gap-1'
                      >
                        {value}
                        <Button
                          variant='ghost'
                          size='icon'
                          className='h-4 w-4'
                          onClick={() =>
                            removeOptionValue(currentOption, valueIndex)
                          }
                        >
                          <X className='h-3 w-3' />
                        </Button>
                      </Badge>
                    ),
                  )}
                </div>
                <div className='flex items-center gap-2'>
                  <Input
                    placeholder='Value (e.g. Small)'
                    value={newOptionValue}
                    onChange={(e) => setNewOptionValue(e.target.value)}
                  />
                  <Button
                    variant='outline'
                    size='sm'
                    onClick={addOptionValue}
                    disabled={!newOptionValue.trim()}
                  >
                    <Plus className='h-4 w-4 mr-1' />
                    Add
                  </Button>
                </div>
              </div>
            )}
          </div>

          {(form.watch('variants') ?? []).length > 0 && (
            <div className='border rounded-md overflow-hidden'>
              <div className='bg-muted p-2 font-medium'>
                Variants {(form.watch('variants') ?? []).length}
              </div>
              <div className='overflow-x-auto'>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Variant</TableHead>
                      <TableHead>Price</TableHead>
                      <TableHead>SKU</TableHead>
                      <TableHead>Quantity</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {(form.watch('variants') ?? []).map((variant, index) => (
                      <TableRow key={index}>
                        <TableCell>
                          {[variant.option1, variant.option2, variant.option3]
                            .filter(Boolean)
                            .join(' / ')}
                        </TableCell>
                        <TableCell>
                          <div className='relative w-24'>
                            <span className='absolute left-3 top-2.5 text-muted-foreground'>
                              $
                            </span>
                            <Input
                              className='pl-6'
                              value={variant.price}
                              onChange={(e) => {
                                const variants = [
                                  ...(form.getValues('variants') || []),
                                ];
                                variants[index].price =
                                  Number.parseFloat(e.target.value) || 0;
                                form.setValue('variants', variants);
                              }}
                            />
                          </div>
                        </TableCell>
                        <TableCell>
                          <Input
                            value={variant.sku || ''}
                            onChange={(e) => {
                              const variants = [
                                ...(form.getValues('variants') || []),
                              ];
                              variants[index].sku = e.target.value;
                              form.setValue('variants', variants);
                            }}
                          />
                        </TableCell>
                        <TableCell>
                          <Input
                            type='number'
                            value={variant.quantity || 0}
                            onChange={(e) => {
                              const variants = [
                                ...(form.getValues('variants') || []),
                              ];
                              variants[index].quantity =
                                Number.parseInt(e.target.value) || 0;
                              form.setValue('variants', variants);
                            }}
                          />
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </div>
          )}
        </>
      )}
    </div>
  );
}
