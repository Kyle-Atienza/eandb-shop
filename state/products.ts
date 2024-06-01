import { create } from "zustand";
import axios from "axios";
const API_URL = `${process.env.NEXT_PUBLIC_BASE_URL}/products`;

interface ProductsState {
  isLoading: boolean;
  isError: boolean;
  products: Product[];
  items: ProductItem[];
  productList: ProductListingOptions[];
  setIsLoading: (isLoading: boolean) => void;
  setProducts: (products: Product[]) => void;
  getProducts: () => void;
  getProductItems: () => void;
  getProductList: (group: string) => void;
}

export const useProductsStore = create<ProductsState>((set) => ({
  products: [],
  items: [],
  productList: [],
  isLoading: false,
  isError: false,
  setIsLoading: (isLoading: boolean) => set({ isLoading }),
  setProducts: (products: Product[]) => set({ products }),
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
  getProductItems: async () => {
    set({ isLoading: true, isError: false });

    await axios({
      method: "get",
      url: `${API_URL}/items`,
    })
      .then((res) => {
        set({ items: res.data });
      })
      .catch((e) => {
        console.log(e);
        set({ isError: true });
      })
      .finally(() => {
        set({ isLoading: false });
      });
  },
  getProductList: async (group: string) => {
    set({ isLoading: true, isError: false });

    await axios({
      method: "get",
      // url: `${API_URL}/list/${group}`,
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
