'use client';

import { ChevronRight } from 'lucide-react';
import Link from 'next/link';

import { categories } from '@/app/data/categories';
import type { Category } from '@/types/category';

interface CategoryBreadcrumbProps {
  category: Category;
}

export function CategoryBreadcrumb({ category }: CategoryBreadcrumbProps) {
  // Function to get the category path (including all parents)
  const getCategoryPath = (
    categoryId: string | null,
    path: Category[] = [],
  ): Category[] => {
    if (!categoryId) return path;

    const currentCategory = categories.find((cat) => cat.id === categoryId);
    if (!currentCategory) return path;

    const newPath = [currentCategory, ...path];

    if (currentCategory.parent) {
      return getCategoryPath(currentCategory.parent, newPath);
    }

    return newPath;
  };

  const categoryPath = getCategoryPath(category.id);

  return (
    <nav className='flex items-center text-sm text-muted-foreground'>
      <Link
        href='/categories'
        className='hover:text-foreground hover:underline'
      >
        Categories
      </Link>
      {categoryPath.map((cat, index) => (
        <div key={cat.id} className='flex items-center'>
          <ChevronRight className='mx-1 h-4 w-4' />
          <Link
            href={
              index === categoryPath.length - 1 ? '#' : `/categories/${cat.id}`
            }
            className={
              index === categoryPath.length - 1
                ? 'font-medium text-foreground'
                : 'hover:text-foreground hover:underline'
            }
          >
            {cat.name}
          </Link>
        </div>
      ))}
    </nav>
  );
}
