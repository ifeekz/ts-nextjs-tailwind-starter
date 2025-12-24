export interface Store {
  id: string;
  name: string;
  slug: string;
  address: string;
  city: string;
  state: string;
  zipCode: string;
  country: string;
  phone: string;
  email: string;
  website?: string;
  description?: string;
  logo?: string;
  status: 'active' | 'inactive';
  storeHours?: StoreHours;
  productsCount: number;
  createdAt: string;
}

export interface StoreHours {
  monday: string;
  tuesday: string;
  wednesday: string;
  thursday: string;
  friday: string;
  saturday: string;
  sunday: string;
}
