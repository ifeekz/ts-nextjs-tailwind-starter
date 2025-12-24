'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';
import { z } from 'zod';

import { MediaUploader } from '@/components/media-uploader';
import { TipTapEditor } from '@/components/tiptap-editor';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Switch } from '@/components/ui/switch';
import { VariantsManager } from '@/components/variants-manager';

const productFormSchema = z.object({
  title: z
    .string()
    .min(2, {
      message: 'Title must be at least 2 characters.',
    })
    .max(100, {
      message: 'Title must not be longer than 100 characters.',
    }),
  description: z.string().optional(),
  category: z.string({
    required_error: 'Please select a category.',
  }),
  status: z.enum(['draft', 'published'], {
    required_error: 'Please select a status.',
  }),
  price: z.coerce
    .number()
    .min(0.01, { message: 'Price must be greater than 0.' }),
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

const defaultValues: Partial<ProductFormValues> = {
  title: '',
  description: '',
  status: 'draft',
  trackInventory: true,
  taxable: true,
  requiresShipping: true,
  variants: [],
  variantOptions: [],
};

export default function ProductForm() {
  const [images, setImages] = useState<string[]>([]);

  const form = useForm<ProductFormValues>({
    resolver: zodResolver(productFormSchema),
    defaultValues,
    mode: 'onChange',
  });

  function onSubmit(data: ProductFormValues) {
    // In a real app, you would submit the data to your backend
    toast.success('Product created', {
      description: 'Your product has been created successfully.',
    });
    console.log({ ...data, images });
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-8'>
        <div className='grid grid-cols-1 gap-8 md:grid-cols-[1fr_300px]'>
          <div className='space-y-8'>
            <Card>
              <CardHeader>
                <CardTitle>Product Information</CardTitle>
                <CardDescription>
                  Basic information about your product
                </CardDescription>
              </CardHeader>
              <CardContent className='space-y-6'>
                <FormField
                  control={form.control}
                  name='title'
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Title</FormLabel>
                      <FormControl>
                        <Input placeholder='Product name' {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name='description'
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Description</FormLabel>
                      <FormControl>
                        <TipTapEditor
                          value={field.value || ''}
                          onChange={field.onChange}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Media</CardTitle>
                <CardDescription>Add images to your product</CardDescription>
              </CardHeader>
              <CardContent>
                <MediaUploader images={images} setImages={setImages} />
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Variants</CardTitle>
                <CardDescription>
                  Add options like size or color to create variants
                </CardDescription>
              </CardHeader>
              <CardContent>
                <VariantsManager form={form} />
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Pricing</CardTitle>
                <CardDescription>
                  Set the pricing for your product
                </CardDescription>
              </CardHeader>
              <CardContent className='space-y-6'>
                <div className='grid grid-cols-1 gap-4 sm:grid-cols-2'>
                  <FormField
                    control={form.control}
                    name='price'
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Price</FormLabel>
                        <FormControl>
                          <div className='relative'>
                            <span className='absolute left-3 top-2.5 text-muted-foreground'>
                              $
                            </span>
                            <Input
                              className='pl-6'
                              placeholder='0.00'
                              {...field}
                            />
                          </div>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name='compareAtPrice'
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Compare-at price</FormLabel>
                        <FormControl>
                          <div className='relative'>
                            <span className='absolute left-3 top-2.5 text-muted-foreground'>
                              $
                            </span>
                            <Input
                              className='pl-6'
                              placeholder='0.00'
                              {...field}
                            />
                          </div>
                        </FormControl>
                        <FormDescription>
                          Original price before discount
                        </FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                <FormField
                  control={form.control}
                  name='costPerItem'
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Cost per item</FormLabel>
                      <FormControl>
                        <div className='relative'>
                          <span className='absolute left-3 top-2.5 text-muted-foreground'>
                            $
                          </span>
                          <Input
                            className='pl-6'
                            placeholder='0.00'
                            {...field}
                          />
                        </div>
                      </FormControl>
                      <FormDescription>
                        Customers won't see this
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Inventory</CardTitle>
                <CardDescription>Manage your product inventory</CardDescription>
              </CardHeader>
              <CardContent className='space-y-6'>
                <div className='grid grid-cols-1 gap-4 sm:grid-cols-2'>
                  <FormField
                    control={form.control}
                    name='sku'
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>SKU (Stock Keeping Unit)</FormLabel>
                        <FormControl>
                          <Input placeholder='SKU' {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name='barcode'
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Barcode (ISBN, UPC, GTIN, etc.)</FormLabel>
                        <FormControl>
                          <Input placeholder='Barcode' {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                <FormField
                  control={form.control}
                  name='trackInventory'
                  render={({ field }) => (
                    <FormItem className='flex flex-row items-center justify-between rounded-lg border p-4'>
                      <div className='space-y-0.5'>
                        <FormLabel className='text-base'>
                          Track inventory
                        </FormLabel>
                        <FormDescription>
                          Keep track of inventory quantities
                        </FormDescription>
                      </div>
                      <FormControl>
                        <Switch
                          checked={field.value}
                          onCheckedChange={field.onChange}
                        />
                      </FormControl>
                    </FormItem>
                  )}
                />
                {form.watch('trackInventory') && (
                  <FormField
                    control={form.control}
                    name='quantity'
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Quantity</FormLabel>
                        <FormControl>
                          <Input type='number' {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                )}
              </CardContent>
            </Card>
          </div>

          <div className='space-y-8'>
            <Card>
              <CardHeader>
                <CardTitle>Status</CardTitle>
                <CardDescription>
                  Control the visibility of your product
                </CardDescription>
              </CardHeader>
              <CardContent>
                <FormField
                  control={form.control}
                  name='status'
                  render={({ field }) => (
                    <FormItem>
                      <Select
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                      >
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder='Select a status' />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value='draft'>Draft</SelectItem>
                          <SelectItem value='published'>Published</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormDescription>
                        Only published products are visible to customers
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Organization</CardTitle>
                <CardDescription>Categorize your product</CardDescription>
              </CardHeader>
              <CardContent>
                <FormField
                  control={form.control}
                  name='category'
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Category</FormLabel>
                      <Select
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                      >
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder='Select a category' />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value='clothing'>Clothing</SelectItem>
                          <SelectItem value='shoes'>Shoes</SelectItem>
                          <SelectItem value='accessories'>
                            Accessories
                          </SelectItem>
                          <SelectItem value='electronics'>
                            Electronics
                          </SelectItem>
                          <SelectItem value='home'>Home & Garden</SelectItem>
                          <SelectItem value='beauty'>
                            Beauty & Health
                          </SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Shipping</CardTitle>
                <CardDescription>Configure shipping options</CardDescription>
              </CardHeader>
              <CardContent className='space-y-4'>
                <FormField
                  control={form.control}
                  name='requiresShipping'
                  render={({ field }) => (
                    <FormItem className='flex flex-row items-center justify-between rounded-lg border p-4'>
                      <div className='space-y-0.5'>
                        <FormLabel className='text-base'>
                          Physical product
                        </FormLabel>
                        <FormDescription>
                          This product requires shipping
                        </FormDescription>
                      </div>
                      <FormControl>
                        <Switch
                          checked={field.value}
                          onCheckedChange={field.onChange}
                        />
                      </FormControl>
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name='taxable'
                  render={({ field }) => (
                    <FormItem className='flex flex-row items-center justify-between rounded-lg border p-4'>
                      <div className='space-y-0.5'>
                        <FormLabel className='text-base'>Charge tax</FormLabel>
                        <FormDescription>
                          This product is taxable
                        </FormDescription>
                      </div>
                      <FormControl>
                        <Switch
                          checked={field.value}
                          onCheckedChange={field.onChange}
                        />
                      </FormControl>
                    </FormItem>
                  )}
                />
              </CardContent>
            </Card>
          </div>
        </div>

        <div className='flex justify-end gap-4'>
          <Button variant='outline'>Discard</Button>
          <Button type='submit'>Save product</Button>
        </div>
      </form>
    </Form>
  );
}
