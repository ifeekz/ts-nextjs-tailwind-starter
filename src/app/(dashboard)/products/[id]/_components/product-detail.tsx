'use client';

import { ChevronLeft, Heart, Share2, Star } from 'lucide-react';
import Link from 'next/link';
import { useState } from 'react';
import { toast } from 'sonner';

import { ProductStatus } from '@/components/product-status';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import type { Product } from '@/types/product';

import { ProductGallery } from './product-gallery';
import { ProductQuantitySelector } from './product-quantity-selector';
import { ProductTabs } from './product-tabs';
import { ProductVariantSelector } from './product-variant-selector';

interface ProductDetailProps {
  product: Product;
}

export function ProductDetail({ product }: ProductDetailProps) {
  const [selectedVariant, setSelectedVariant] = useState(
    product?.variants?.[0] || null,
  );
  const [quantity, setQuantity] = useState(1);

  const handleAddToCart = () => {
    toast.success(
      `${quantity} × ${product.title} (${
        selectedVariant?.option1 || 'Default'
      }) added to your cart`,
    );
  };

  const price = selectedVariant?.price || product.title;
  const formattedPrice = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
  }).format(Number(price));

  return (
    <div className='space-y-8'>
      <div className='flex items-center gap-2'>
        <Button variant='ghost' size='sm' asChild>
          <Link href='/products' className='flex items-center gap-1'>
            <ChevronLeft className='h-4 w-4' />
            Back to products
          </Link>
        </Button>
        <Separator orientation='vertical' className='h-4' />
        <div className='flex items-center gap-1 text-sm text-muted-foreground'>
          <Link href='/products' className='hover:underline'>
            Products
          </Link>
          <span>/</span>
          <Link
            href={`/products?category=${product.category}`}
            className='hover:underline'
          >
            {product.category?.name?.charAt(0)?.toUpperCase() +
              product.category?.name?.slice(1)}
          </Link>
        </div>
      </div>

      <div className='grid gap-8 md:grid-cols-2'>
        <ProductGallery images={product.images} />

        <div className='space-y-6'>
          <div className='space-y-2'>
            <div className='flex items-center justify-between'>
              <h1 className='text-3xl font-bold'>{product.title}</h1>
              <div className='flex items-center gap-2'>
                <Button variant='outline' size='icon'>
                  <Heart className='h-4 w-4' />
                  <span className='sr-only'>Add to wishlist</span>
                </Button>
                <Button variant='outline' size='icon'>
                  <Share2 className='h-4 w-4' />
                  <span className='sr-only'>Share product</span>
                </Button>
              </div>
            </div>

            <div className='flex items-center gap-4'>
              <div className='flex items-center'>
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star
                    key={i}
                    className={`h-5 w-5 ${
                      i < 4
                        ? 'fill-primary text-primary'
                        : 'fill-muted stroke-muted-foreground'
                    }`}
                  />
                ))}
                <span className='ml-2 text-sm text-muted-foreground'>
                  4.0 (24 reviews)
                </span>
              </div>
              <ProductStatus status={product.status} />
            </div>

            <div className='flex items-baseline gap-2'>
              <span className='text-3xl font-bold'>{formattedPrice}</span>
              {Number(product.averagePrice) > 50 && (
                <Badge variant='outline' className='font-normal text-green-600'>
                  Free shipping
                </Badge>
              )}
            </div>
          </div>

          <p className='text-muted-foreground'>{product.description}</p>

          <Separator />

          {product.variants && product.variants.length > 0 && (
            <ProductVariantSelector
              variants={product.variants}
              selectedVariant={selectedVariant}
              onSelectVariant={setSelectedVariant}
            />
          )}

          <div className='space-y-4'>
            <ProductQuantitySelector
              quantity={quantity}
              onQuantityChange={setQuantity}
            />

            <div className='flex flex-col gap-2 sm:flex-row'>
              <Button size='lg' className='sm:flex-1' onClick={handleAddToCart}>
                Add to Cart
              </Button>
              <Button size='lg' variant='secondary' className='sm:flex-1'>
                Buy Now
              </Button>
            </div>
          </div>

          <Separator />

          <div className='grid grid-cols-2 gap-4 text-sm'>
            <div className='space-y-1'>
              <p className='text-muted-foreground'>SKU</p>
              <p className='font-medium'>{product.sku}</p>
            </div>
            <div className='space-y-1'>
              <p className='text-muted-foreground'>Category</p>
              <p className='font-medium'>
                {product.category?.name?.charAt(0).toUpperCase() +
                  product.category?.name?.slice(1)}
              </p>
            </div>
            <div className='space-y-1'>
              <p className='text-muted-foreground'>Inventory</p>
              <p className='font-medium'>{0} in stock</p>
            </div>
            <div className='space-y-1'>
              <p className='text-muted-foreground'>Created</p>
              {/* <p className="font-medium">{new Date(product.createdAt).toLocaleDateString()}</p> */}
            </div>
          </div>
        </div>
      </div>

      <ProductTabs product={product} />
    </div>
  );
}
