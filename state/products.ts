import { create } from "zustand";
import axios from "axios";
const API_URL = `${process.env.BASE_URL}/products`;

interface ProductsState {
  isLoading: boolean;
  isError: boolean;
  products: Product[];
  items: ProductItem[];
  productList: ProductListingItem[];
  setIsLoading: (isLoading: boolean) => void;
  getProducts: () => void;
  getProductList: () => void;
}

export const useProductsStore = create<ProductsState>((set) => ({
  products: [],
  items: [],
  productList: [],
  isLoading: false,
  isError: false,
  setIsLoading: (isLoading: boolean) => set({ isLoading }),
  getProducts: async () => {
    set({ isLoading: true, isError: false });

    await axios({
      method: "get",
      url: `${API_URL}/`,
    })
      .then((res) => {
        set({ products: res.data });
      })
      .catch((e) => {
        console.log(e);
        set({ isError: true });
      })
      .finally(() => {
        set({ isLoading: false });
      });
  },
  getProductList: async () => {
    set({ isLoading: true, isError: false });

    await axios({
      method: "get",
      url: `${API_URL}/list`,
    })
      .then((res) => {
        set({ productList: res.data });
      })
      .catch((e) => {
        console.log(e);
        set({ isError: true });
      })
      .finally(() => {
        set({ isLoading: false });
      });
  },
}));
