declare global {
  interface Product {
    _id: string;
    name: string;
    attribute?: string;
    image?: string;
    amount: number;
  }
}

export default global;
