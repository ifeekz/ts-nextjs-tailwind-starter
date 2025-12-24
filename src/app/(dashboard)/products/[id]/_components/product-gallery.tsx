'use client';

import { ChevronLeft, ChevronRight, Expand } from 'lucide-react';
import Image from 'next/image';
import { useState } from 'react';

import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogTrigger } from '@/components/ui/dialog';
import { cn } from '@/lib/utils';

interface ProductGalleryProps {
  images: string[];
}

export function ProductGallery({ images }: ProductGalleryProps) {
  const [currentImage, setCurrentImage] = useState(0);

  const handlePrevious = () => {
    setCurrentImage((prev) => (prev === 0 ? images.length - 1 : prev - 1));
  };

  const handleNext = () => {
    setCurrentImage((prev) => (prev === images.length - 1 ? 0 : prev + 1));
  };

  return (
    <div className='space-y-4'>
      <div className='relative aspect-square overflow-hidden rounded-lg border'>
        <Image
          src='/placeholder.svg?height=600&width=600'
          alt='Product image'
          fill
          className='object-cover'
          sizes='(max-width: 768px) 100vw, 50vw'
          priority
        />
        <div className='absolute inset-0 flex items-center justify-between p-4'>
          <Button size='icon' variant='outline' onClick={handlePrevious}>
            <ChevronLeft className='h-4 w-4' />
            <span className='sr-only'>Previous image</span>
          </Button>
          <Button size='icon' variant='outline' onClick={handleNext}>
            <ChevronRight className='h-4 w-4' />
            <span className='sr-only'>Next image</span>
          </Button>
        </div>
        <Dialog>
          <DialogTrigger asChild>
            <Button
              size='icon'
              variant='outline'
              className='absolute bottom-4 right-4'
            >
              <Expand className='h-4 w-4' />
              <span className='sr-only'>Zoom image</span>
            </Button>
          </DialogTrigger>
          <DialogContent className='max-w-4xl'>
            <div className='relative aspect-square'>
              <Image
                src='/placeholder.svg?height=1200&width=1200'
                alt='Product image'
                fill
                className='object-contain'
                sizes='(max-width: 1024px) 100vw, 1024px'
              />
            </div>
          </DialogContent>
        </Dialog>
      </div>
      <div className='flex space-x-2 overflow-x-auto pb-2'>
        {images?.map((image, index) => (
          <button
            type='button'
            key={index}
            className={cn(
              'relative h-20 w-20 flex-shrink-0 overflow-hidden rounded-md border',
              currentImage === index && 'ring-2 ring-primary ring-offset-2',
            )}
            onClick={() => setCurrentImage(index)}
          >
            <Image
              src={image || '/placeholder.svg?height=80&width=80'}
              alt={`Product thumbnail ${index + 1}`}
              fill
              className='object-cover'
              sizes='80px'
            />
          </button>
        ))}
      </div>
    </div>
  );
}
