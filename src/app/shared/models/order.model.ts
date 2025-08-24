export interface Order {
    phone: string;
    email: string;
    firstName: string;
    lastName: string;
    country: string;
    address: string;
    city: string;
    shippingMethod: ShippingMethod;
    paymentMethod: PaymentMethod;
    cart: ProductInOrder[];
    shippingFee: number;
    totalAmount: number;
    orderStatus: OrderStatus;
};
export type PaymentMethod = 'COD' | 'Bank Transfer';

export type ShippingMethod =
  | 'Express Delivery (HCM) - 1-3 days'
  | 'Same-Day Delivery Inner HCM (<10km from District 1)'
  | 'Express Delivery Southern Provinces - 1-3 days'
  | 'Express Delivery Northern Provinces - 3-5 days'
  | 'Same-Day Delivery Outer HCM (>10km from District 1)';

export type OrderStatus =
| 'Pending Confirmation'
| 'Confirmed'
| 'Preparing Items'
| 'Shipping'
| 'Delivered'
| 'Cancelled';

export interface ProductInOrder {
    productId: string | number;
    productName: string;
    unitPrice: number;
    quantity: number;
    productType?: string;
    imageUrl: string;
};