import axios from "axios";
import { create } from "zustand";
import { useUserStore } from "./user";
const API_URL = `${process.env.BASE_URL}/orders`;

interface OrdersState {
  isLoading: boolean;
  isError: boolean;
  orders: Order[];
  cart: Order;
  addToCart: (productId: string, count?: number) => void;
  updateCartItemQuantity: (data: FormData) => void;
  deleteCartItem: (productId: string) => void;
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
  addToCart: async (productId: string, count?: number) => {
    set({ isLoading: true });
    const config = {
      headers: {
        Authorization: `Bearer ${useUserStore.getState().user?.token}`,
      },
    };

    await axios
      .post(`${API_URL}/cart/add`, { productId, count: count ?? 1 }, config)
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
  updateCartItemQuantity: async (data: FormData) => {
    const productId = data.get("product-id");
    const product = useOrdersStore
      .getState()
      .cart.items.find((item) => item.product._id === productId);
    const count = Number(data.get("quantity")) - (product?.count || 0);

    if (count !== 0) {
      set({ isLoading: true });
      const config = {
        headers: {
          Authorization: `Bearer ${useUserStore.getState().user?.token}`,
        },
      };

      await axios
        .post(`${API_URL}/cart/add`, { productId, count }, config)
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
    }
  },
  deleteCartItem: async (productId: string) => {
    const config = {
      headers: {
        Authorization: `Bearer ${useUserStore.getState().user?.token}`,
      },
    };

    await axios
      .post(`${API_URL}/cart/remove`, { productId }, config)
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
  setCart: (cart: Order) => set({ cart }),
  getCart: async () => {
    set({ isLoading: true });
    const config = {
      headers: {
        Authorization: `Bearer ${useUserStore.getState().user?.token}`,
      },
    };

    await axios(`${API_URL}/cart`, config)
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
