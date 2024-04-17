declare global {
  interface Product {
    _id: string;
    name: string;
    attribute?: string;
    image?: string;
    amount: number;
  }

  interface User {
    _id: string;
    name: string;
    email: string;
    token: string;
  }
  interface CartItem {
    _id: string;
    product: Product;
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
