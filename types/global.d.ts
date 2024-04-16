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

  interface Order {
    _id: string;
    items: [string];
    amount: number;
    address: string;
    status: number;
  }

  interface SignInData {
    email: string;
    password: string;
  }
}

export default global;
