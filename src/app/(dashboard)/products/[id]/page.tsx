import type { Metadata } from 'next';
import { notFound } from 'next/navigation';

import { products } from '@/data/products';

import { ProductDetail } from './_components/product-detail';

interface ProductPageProps {
  params: {
    id: string;
  };
}

export async function generateMetadata({
  params,
}: ProductPageProps): Promise<Metadata> {
  const product = products.find((product) => product.id === params.id);

  if (!product) {
    return {
      title: 'Product Not Found',
      description: 'The requested product could not be found',
    };
  }

  return {
    title: product.title,
    description: product.description,
  };
}

export default function ProductPage({ params }: ProductPageProps) {
  const product = products.find((product) => product.id === params.id);

  if (!product) {
    notFound();
  }

  // In a real app, you would fetch the product data from your API
  // For this example, we're using the mock data and adding multiple images
  const productWithImages = {
    ...product,
    // images: [
    //     product.thumbnail,
    //     "/placeholder.svg?height=600&width=600",
    //     "/placeholder.svg?height=600&width=600",
    //     "/placeholder.svg?height=600&width=600",
    //     "/placeholder.svg?height=600&width=600",
    // ],
    // variants: [
    //     { id: "v1", name: "Small", price: product.price },
    //     { id: "v2", name: "Medium", price: (Number(product.price) + 5).toFixed(2) },
    //     { id: "v3", name: "Large", price: (Number(product.price) + 10).toFixed(2) },
    // ],
    specifications: [
      { name: 'Material', value: '100% Cotton' },
      { name: 'Weight', value: '0.5 kg' },
      { name: 'Dimensions', value: '25 × 15 × 5 cm' },
      { name: 'Care Instructions', value: 'Machine wash cold, tumble dry low' },
    ],
  };

  return (
    <div className='container p-6 bg-white/80 backdrop-blur-sm rounded-2xl shadow-md'>
      <ProductDetail product={productWithImages} />
    </div>
  );
}
