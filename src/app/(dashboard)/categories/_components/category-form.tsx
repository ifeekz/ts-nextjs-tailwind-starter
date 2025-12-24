'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { Copy } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';
import { z } from 'zod';

import { MediaUploader } from '@/components/media-uploader';
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
import { Textarea } from '@/components/ui/textarea';
import { categories } from '@/data/categories';
import type { Category } from '@/types/category';

const categoryFormSchema = z.object({
  name: z
    .string()
    .min(2, {
      message: 'Category name must be at least 2 characters.',
    })
    .max(50, {
      message: 'Category name must not be longer than 50 characters.',
    }),
  slug: z
    .string()
    .min(2, {
      message: 'Slug must be at least 2 characters.',
    })
    .max(50, {
      message: 'Slug must not be longer than 50 characters.',
    })
    .regex(/^[a-z0-9-]+$/, {
      message: 'Slug can only contain lowercase letters, numbers, and hyphens.',
    }),
  description: z.string().optional(),
  parent: z.string().optional(),
  featured: z.boolean().default(false),
  showInMenu: z.boolean().default(true),
  metaTitle: z.string().optional(),
  metaDescription: z.string().optional(),
});

type CategoryFormValues = z.infer<typeof categoryFormSchema>;

interface CategoryFormProps {
  category?: Category;
}

export function CategoryForm({ category }: CategoryFormProps) {
  const router = useRouter();
  const [images, setImages] = useState<string[]>(
    category?.image ? [category.image] : [],
  );

  const defaultValues: Partial<CategoryFormValues> = {
    name: category?.name || '',
    slug: category?.slug || '',
    description: category?.description || '',
    // parent: category?.parent || "",
    // featured: category?.featured || false,
    // showInMenu: category?.showInMenu !== false, // default to true if not specified
    metaTitle: category?.metaTitle || '',
    metaDescription: category?.metaDescription || '',
  };

  const form = useForm<CategoryFormValues>({
    resolver: zodResolver(categoryFormSchema),
    defaultValues,
    mode: 'onChange',
  });

  const generateSlug = () => {
    const name = form.getValues('name');
    if (name) {
      const slug = name
        .toLowerCase()
        .replace(/[^\w\s-]/g, '')
        .replace(/\s+/g, '-');
      form.setValue('slug', slug, { shouldValidate: true });
    }
  };

  function onSubmit(data: CategoryFormValues) {
    // In a real app, you would submit the data to your backend
    toast.success(category ? 'Category updated' : 'Category created', {
      description: `${data.name} has been ${
        category ? 'updated' : 'created'
      } successfully.`,
    });

    console.log({ ...data, image: images[0] });

    // Redirect back to categories list
    router.push('/categories');
  }

  // Filter out the current category from parent options to prevent circular references
  const parentOptions = categories.filter(
    (cat) => !category || cat.id !== category.id,
  );

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-8'>
        <div className='grid grid-cols-1 gap-8 md:grid-cols-[1fr_300px]'>
          <div className='space-y-8'>
            <Card>
              <CardHeader>
                <CardTitle>Category Information</CardTitle>
                <CardDescription>
                  Basic information about your category
                </CardDescription>
              </CardHeader>
              <CardContent className='space-y-6'>
                <FormField
                  control={form.control}
                  name='name'
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Name</FormLabel>
                      <FormControl>
                        <Input placeholder='Category name' {...field} />
                      </FormControl>
                      <FormDescription>
                        The name of the category as it will appear in your
                        store.
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name='slug'
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Slug</FormLabel>
                      <FormControl>
                        <div className='flex gap-2'>
                          <Input placeholder='category-slug' {...field} />
                          <Button
                            type='button'
                            variant='outline'
                            size='icon'
                            onClick={generateSlug}
                            title='Generate from name'
                          >
                            <Copy className='h-4 w-4' />
                          </Button>
                        </div>
                      </FormControl>
                      <FormDescription>
                        The URL-friendly version of the name. Used in the URL.
                      </FormDescription>
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
                        <Textarea
                          placeholder='Category description (optional)'
                          className='resize-none min-h-[100px]'
                          {...field}
                        />
                      </FormControl>
                      <FormDescription>
                        A brief description of the category. This may be used on
                        category pages.
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Category Image</CardTitle>
                <CardDescription>
                  Upload an image for this category
                </CardDescription>
              </CardHeader>
              <CardContent>
                <MediaUploader images={images} setImages={setImages} />
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>SEO Settings</CardTitle>
                <CardDescription>Optimize for search engines</CardDescription>
              </CardHeader>
              <CardContent className='space-y-6'>
                <FormField
                  control={form.control}
                  name='metaTitle'
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Meta Title</FormLabel>
                      <FormControl>
                        <Input placeholder='Meta title (optional)' {...field} />
                      </FormControl>
                      <FormDescription>
                        The title that appears in search engine results.
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name='metaDescription'
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Meta Description</FormLabel>
                      <FormControl>
                        <Textarea
                          placeholder='Meta description (optional)'
                          className='resize-none'
                          {...field}
                        />
                      </FormControl>
                      <FormDescription>
                        The description that appears in search engine results.
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </CardContent>
            </Card>
          </div>

          <div className='space-y-8'>
            <Card>
              <CardHeader>
                <CardTitle>Organization</CardTitle>
                <CardDescription>Categorize your products</CardDescription>
              </CardHeader>
              <CardContent className='space-y-6'>
                <FormField
                  control={form.control}
                  name='parent'
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Parent Category</FormLabel>
                      <Select
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                      >
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder='No parent (top level)' />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value='none'>
                            No parent (top level)
                          </SelectItem>
                          {parentOptions.map((cat) => (
                            <SelectItem key={cat.id} value={cat.id}>
                              {cat.name}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      <FormDescription>
                        Select a parent category to create a hierarchy.
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Display Options</CardTitle>
                <CardDescription>
                  Control how the category appears
                </CardDescription>
              </CardHeader>
              <CardContent className='space-y-6'>
                <FormField
                  control={form.control}
                  name='featured'
                  render={({ field }) => (
                    <FormItem className='flex flex-row items-center justify-between rounded-lg border p-4'>
                      <div className='space-y-0.5'>
                        <FormLabel className='text-base'>
                          Featured Category
                        </FormLabel>
                        <FormDescription>
                          Featured categories are highlighted on your store.
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
                  name='showInMenu'
                  render={({ field }) => (
                    <FormItem className='flex flex-row items-center justify-between rounded-lg border p-4'>
                      <div className='space-y-0.5'>
                        <FormLabel className='text-base'>
                          Show in Navigation Menu
                        </FormLabel>
                        <FormDescription>
                          Display this category in the navigation menu.
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
          <Button
            type='button'
            variant='outline'
            onClick={() => router.push('/categories')}
          >
            Cancel
          </Button>
          <Button type='submit'>
            {category ? 'Update Category' : 'Create Category'}
          </Button>
        </div>
      </form>
    </Form>
  );
}
