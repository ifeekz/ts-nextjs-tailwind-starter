'use client';

import { Upload, X } from 'lucide-react';
import Image from 'next/image';
import type React from 'react';
import { useState } from 'react';

import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

interface MediaUploaderProps {
  images: string[];
  setImages: (images: string[]) => void;
}

export function MediaUploader({ images, setImages }: MediaUploaderProps) {
  const [isDragging, setIsDragging] = useState(false);

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);

    // In a real app, you would upload these files to your server or a storage service
    // For this demo, we'll just create object URLs
    if (e.dataTransfer.files) {
      const newImages = Array.from(e.dataTransfer.files)
        .filter((file) => file.type.startsWith('image/'))
        .map((file) => URL.createObjectURL(file));

      setImages([...images, ...newImages]);
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      // In a real app, you would upload these files to your server or a storage service
      // For this demo, we'll just create object URLs
      const newImages = Array.from(e.target.files)
        .filter((file) => file.type.startsWith('image/'))
        .map((file) => URL.createObjectURL(file));

      setImages([...images, ...newImages]);
    }
  };

  const removeImage = (index: number) => {
    const newImages = [...images];
    newImages.splice(index, 1);
    setImages(newImages);
  };

  return (
    <div className='space-y-4'>
      <div
        className={cn(
          'border-2 border-dashed rounded-lg p-8 text-center',
          isDragging
            ? 'border-primary bg-primary/5'
            : 'border-muted-foreground/25',
        )}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
      >
        <div className='flex flex-col items-center justify-center gap-2'>
          <div className='bg-muted rounded-full p-3'>
            <Upload className='h-6 w-6 text-muted-foreground' />
          </div>
          <div className='flex flex-col items-center gap-1'>
            <p className='text-sm font-medium'>
              Drag and drop images, or{' '}
              <label className='text-primary underline cursor-pointer'>
                browse
                <input
                  type='file'
                  className='sr-only'
                  accept='image/*'
                  multiple
                  onChange={handleFileChange}
                />
              </label>
            </p>
            <p className='text-xs text-muted-foreground'>
              Supported formats: JPEG, PNG, GIF, WebP
            </p>
          </div>
        </div>
      </div>

      {images.length > 0 && (
        <div className='grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4'>
          {images.map((image, index) => (
            <div
              key={index}
              className='relative group aspect-square border rounded-md overflow-hidden'
            >
              <Image
                src={image || '/placeholder.svg'}
                alt={`Product image ${index + 1}`}
                fill
                className='object-cover'
              />
              <Button
                variant='destructive'
                size='icon'
                className='absolute top-2 right-2 h-6 w-6 opacity-0 group-hover:opacity-100 transition-opacity'
                onClick={() => removeImage(index)}
              >
                <X className='h-3 w-3' />
              </Button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
