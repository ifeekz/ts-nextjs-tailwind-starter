export interface MiniCategory {
  id: string;
  name: string;
  slug: string;
}

export interface Category {
  id: string;
  name: string;
  slug: string;
  description?: string;
  parentId?: MiniCategory | null;
  isFeatured: boolean;
  showInNavigation: boolean;
  imageUrl?: string;
  icon?: string;
  metaTitle?: string;
  metaDescription?: string;
  productsCount?: number;
  createdAt?: string;
}

export type CategoryPayload = Omit<
  Category,
  'id' | 'parentId' | 'productsCount' | 'createdAt' | 'updatedAt'
> & { parentId?: string | null };
