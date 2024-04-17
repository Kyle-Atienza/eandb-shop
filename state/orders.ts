import axios from "axios";
import { create } from "zustand";
import { useUserStore } from "./user";
const API_URL = `${process.env.BASE_URL}/orders`;

interface OrdersState {
  isLoading: boolean;
  isError: boolean;
  orders: Order[];
  cart: Order;
  addToCart: (productId: string) => void;
  setCart: (cartItems: Order) => void;
  getCart: () => void;
  resetOrdersStore: () => void;
}

const initialState = {
  orders: [],
  cart: {
    _id: "",
    address: "",
    amount: 0,
    items: [],
  },
};

export const useOrdersStore = create<OrdersState>((set) => ({
  ...initialState,
  isLoading: false,
  isError: false,
  /* orders: [],
  cart: {
    _id: "",
    address: "",
    amount: 0,
    items: [],
  }, */
  addToCart: async (productId: string) => {
    set({ isLoading: true });
    const config = {
      headers: {
        Authorization: `Bearer ${useUserStore.getState().user?.token}`,
      },
    };

    await axios
      .post(`${API_URL}/cart/add`, { productId }, config)
      .then((res) => {
        console.log(res);
      })
      .catch((e) => {
        console.log(e);
        set({ isError: true });
      })
      .finally(() => {
        set({ isLoading: false });
      });
  },
  setCart: (cart: Order) => set({ cart }),
  getCart: async () => {
    set({ isLoading: true });
    const config = {
      headers: {
        Authorization: `Bearer ${useUserStore.getState().user?.token}`,
      },
    };

    await axios
      .get(`${API_URL}/cart`, config)
      .then((res) => {
        set({ cart: res.data });
      })
      .catch((e) => {
        console.log(e);
        set({ isError: true });
      })
      .finally(() => {
        set({ isLoading: false });
      });
  },
  resetOrdersStore: () => set(initialState),
}));
