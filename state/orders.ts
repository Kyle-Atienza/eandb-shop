import axios from "axios";
import { create } from "zustand";
import { useUserStore } from "./user";
const API_URL = `${process.env.BASE_URL}/orders`;

import toast from "react-hot-toast";

interface OrdersState {
  message: string;
  isLoading: boolean;
  isError: boolean;
  orders: Order[];
  cart: Order;
  addToCart: (productId: string, count?: number) => void;
  updateCartItemQuantity: (data: FormData) => void;
  deleteCartItem: (productId: string) => void;
  getCart: () => void;
  resetOrdersStore: () => void;
}

const initialState = {
  message: "",
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

    const existingCartItem = useOrdersStore
      .getState()
      .cart.items.find((cartItem) => cartItem.product._id === productId);
    if (existingCartItem) {
      toast.loading("Updating Item Quantity");
    } else {
      toast.loading("Adding Item to Cart");
    }

    const config = {
      headers: {
        Authorization: `Bearer ${useUserStore.getState().user?.token}`,
      },
    };

    await axios
      .post(`${API_URL}/cart/add`, { productId, count: count ?? 1 }, config)
      .then((res) => {
        set({ cart: res.data });
        toast.dismiss();
        if (existingCartItem) {
          toast.success("Succesfully Updated Item Quantity");
        } else {
          toast.success("Succesfully Added Item to Cart");
        }
      })
      .catch((e) => {
        console.log(e);
        set({ isError: true });
        toast.dismiss();
        toast.error(e.message);
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
