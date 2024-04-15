import { create } from "zustand";
import axios from "axios";
const API_URL = `${process.env.BASE_URL}/products`;

interface ProductsState {
  products: Product[];
  isLoading: boolean;
  setIsLoading: (isLoading: boolean) => void;
  setProducts: (products: Product[]) => void;
  getProducts: () => void;
}

export const useProductsStore = create<ProductsState>((set) => ({
  products: [],
  isLoading: false,
  setIsLoading: (isLoading: boolean) => set({ isLoading }),
  setProducts: (products: Product[]) => set({ products }),
  getProducts: async () => {
    await axios({
      method: "get",
      url: `${API_URL}/`,
    }).then((res) => {
      set({ products: res.data });
    });
  },
}));
