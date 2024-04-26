declare global {
  interface Product {
    _id: string;
    name: string;
    description?: string;
    gallery: string[];
    items: {
      name: string;
      options: ProductItem[];
    }[];
  }
  interface ProductOption {
    _id: string;
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
    name: string;
    options: ProductItem[];
    details: Product;
  }

  interface ProductOptionSelect extends ProductOption {
    selected: boolean;
  }

  interface ProductOptionSelectItem {
    name: string;
    options: ProductOptionSelect[];
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
