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
    group: string;
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
    defaults: {
      address: {
        billing: string;
        shipping: string;
      };
    };
  }
  interface CartItem {
    _id: string;
    product: ProductItem;
    price: number;
    count: number;
  }

  interface OrderAddress {
    _id: string;
    address: string;
    zip: string;
    phone: string;
  }

  interface Order {
    _id: string;
    items: CartItem[];
    amount: number;
    status: string;
    createdAt: string;
    address: {
      billing: OrderAddress | null;
      shipping: OrderAddress | null;
    };
  }

  interface SignInData {
    email: string;
    password: string;
  }

  interface SearchParams {
    [key: string]: string | string[] | undefined;
  }

  interface Colors {
    color: "dark" | "base" | "light" | "primary" | "tertiary";
  }

  interface Fees {
    delivery: number;
  }
}

export default global;
