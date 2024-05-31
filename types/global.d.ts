declare global {
  // products
  interface Product {
    _id: string;
    name: string;
    description?: string;
    taglines?: string;
    gallery: string[];
    items: {
      name: string;
      options: ProductItem[];
    }[];
    group: string;
    nutritionalFacts: {
      content: string;
      value: string;
    }[];
    ingredients: string[];
    allergens: string[];
    awards: string[];
    netWeight: string;
    sort: number;
    code: string;
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
    attribute: ProductOption;
    netWeight: string;
    images: {
      url: string;
      tag: string;
    }[];
    default: boolean;
  }

  interface ProductPageItem extends Product {
    variants: ProductItem[];
  }

  interface ProductListingOptions {
    _id: string;
    options: ProductListingItem[];
    details: Product;
  }

  interface ProductListingItem {
    _id: string;
    name: string;
    variants: ProductItem[];
    details: Product;
  }

  interface ProductOptionSelect extends ProductItem {
    selected: boolean;
  }

  interface ProductOptionSelectItem {
    name: string;
    options: ProductOptionSelect[];
  }

  // user
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

  // cart
  interface CartItem {
    _id?: string;
    productItemId: string;
    // product: ProductItem;
    // price: number;
    count: number;
  }

  // order

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
