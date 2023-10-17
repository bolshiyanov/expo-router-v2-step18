export interface DeliveryOption {
  deliveryId: string;
  deliveryCompanyName: string;
  shippingPrice: number;
  deliveryTime: number;
}

export interface ShippingRegion {
  id: string;
  image: string;
  region: string;
  tax: number;
  deliveryOptions: DeliveryOption[];
}

export interface ShippingArray {
  [index: number]: ShippingRegion;
}
