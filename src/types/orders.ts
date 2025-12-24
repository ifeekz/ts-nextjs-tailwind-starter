export interface OrderItem {
  name: string;
  price: string;
  quantity: number;
  image?: string;
  options?: Record<string, string>;
}

export interface Address {
  line1: string;
  line2?: string;
  city: string;
  state: string;
  postalCode: string;
  country: string;
}

export interface TimelineItem {
  status: string;
  date: string;
  note?: string;
}

export interface Order {
  id: string;
  orderNumber: string;
  date: string;
  customer: {
    name: string;
    email: string;
    phone?: string;
  };
  status: string;
  paymentStatus: string;
  paymentMethod: string;
  cardLast4?: string;
  transactionId?: string;
  shippingMethod: string;
  shippingAddress: Address;
  billingAddress?: Address;
  trackingNumber?: string;
  estimatedDelivery?: string;
  items: OrderItem[];
  subtotal: string;
  shipping: string;
  tax: string;
  total: string;
  timeline: TimelineItem[];
}
