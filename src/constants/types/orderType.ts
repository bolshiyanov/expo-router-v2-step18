export interface OrderTypeInterface {
  id: string;
  cart: CartOrder[];
  date: string;

  orderNumber: string;
  currentCouponCode: string;
  discount: number;
  totalAmountFromCart: number;
  totalAmount: number;
  tax: number;  
  finalTotalAmount: number; 

  lang: string;
  
  type: string;
  email: string;
  fristNameBilling: string;
  lastNameBilling: string;
  phoneBilling: string;
  addressline1Billing: string;
  addressline2Billing: string;
  city: string;
  provinceBilling: string;
  zipCodeBilling: string;

  deliveryId: string;
  shippingPrice: number;
  deliveryCompanyName: string;
  deliveryTime: number;

  currentRegionId: string;
  currentRegion: string;
  
  firstNameShipping: string;
  lastNameShipping: string;
  phoneShipping: string;
  cityShipping: string;
  addressline1Shipping: string;
  addressline2Shipping: string;
  currentRegionIdShipping: string;
  provinceShipping: string;
  zipCodeShipping: string;

  nextCouponCode: string;
  referyId: string;
    
}

export interface CartOrder {
  id: string;
  image: string;
  price: number;
  number: number;
  name: string;
}

