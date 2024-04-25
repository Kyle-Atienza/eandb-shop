declare global {
  interface Product {
    _id: string;
    name: string;
    description?: string;
    gallery: string[];
  }
  interface ProductOption {
    type: string;
    value: string;
  }
  interface ProductItem {
    _id: string;
    name: string;
    amount: number;
    details: Product;
    attributes: ProductOption[];
  }
  interface ProductListingItem {
    _id: string;
    options: ProductItem[];
    details: Product;
  }

  interface User {
    _id: string;
    name: string;
    email: string;
    token: string;
  }
  interface CartItem {
    _id: string;
    product: ProductItem;
    price: number;
    count: number;
  }

  interface Order {
    _id: string;
    items: CartItem[];
    amount: number;
    address: string;
  }

  interface SignInData {
    email: string;
    password: string;
  }
}

export default global;
