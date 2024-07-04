export interface Product {
  name: string;
  price: number;
}

export interface Catalogue {
  [productName: string]: Product;
}

export interface Offer {
  description: string;
  apply: (basket: Basket, catalogue: Catalogue) => number;
}

export interface BasketItem {
  productName: string;
  quantity: number;
}

export interface Basket {
  items: BasketItem[];
}

export interface PricingSummary {
  subTotal: number;
  discount: number;
  total: number;
}
