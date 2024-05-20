import axios from "axios";
import { create } from "zustand";
import { useUserStore } from "./user";
const API_URL = `${process.env.NEXT_PUBLIC_BASE_URL}/orders`;

import toast from "react-hot-toast";

interface OrdersState {
  message: string;
  isLoading: boolean;
  isError: boolean;
  orders: Order[];
  cart: Order;
  localCart: Order | null;
  addresses: OrderAddress[];
  addToCart: (productId: string, count?: number) => void;
  addToLocalCart: (cartItemId: string, count?: number) => void;
  updateCartItemQuantity: (data: FormData) => void;
  deleteCartItem: (productId: string) => void;
  getCart: () => void;
  getOrders: () => void;
  resetOrdersStore: () => void;
  getAddresses: () => void;
  createAddress: (data: FormData) => void;
  updateAddress: (data: FormData) => void;
  deleteAddress: (id: string) => void;
  checkLocalCart: () => void;
}

const initialState = {
  message: "",
  orders: [],
  cart: {
    _id: "",
    amount: 0,
    items: [],
    status: "",
    createdAt: "",
    address: {
      billing: null,
      shipping: null,
    },
  },
  localCart: null,
  addresses: [],
};

export const useOrdersStore = create<OrdersState>((set) => ({
  ...initialState,
  isLoading: false,
  isError: false,
  checkLocalCart: () => {
    if (localStorage.getItem("cart")) {
      set({ localCart: JSON.parse(localStorage.getItem("cart")!) });
      console.log("retrieved local cart", useOrdersStore.getState().localCart);
    } else {
      localStorage.setItem("cart", JSON.stringify(initialState.cart));
      set({ localCart: JSON.parse(localStorage.getItem("cart")!) });
      console.log("created local cart", useOrdersStore.getState().localCart);
    }
  },
  addToLocalCart: (cartItemId: string, count?: number) => {
    const localCart = useOrdersStore.getState().localCart;

    if (localCart) {
      const existingCartItemIndex = localCart.items.findIndex(
        (item) => item._id === cartItemId
      );

      let updatedCart;

      if (existingCartItemIndex === -1) {
        const newCartItem = { _id: cartItemId, count: count || 1 };
        updatedCart = {
          ...localCart,
          items: [...localCart.items, newCartItem],
        };
        toast.success("Item added to cart!");
      } else {
        const existingCartItem = localCart.items[existingCartItemIndex];
        if (existingCartItem.count === 1 && count === -1) {
          updatedCart = {
            ...localCart,
            items: localCart.items.filter((item) => item._id !== cartItemId),
          };
          toast.success("Item deleted 🗑");
        } else {
          const updatedItems = [...localCart.items];
          updatedItems[existingCartItemIndex] = {
            ...existingCartItem,
            count: existingCartItem.count + (count || 1),
          };
          updatedCart = { ...localCart, items: updatedItems };
          toast.success("Item quantity updated");
        }
      }

      set({ localCart: updatedCart });
      localStorage.setItem("cart", JSON.stringify(updatedCart));
    }
  },
  addToCart: async (productId: string, count?: number) => {
    /* set({ isLoading: true });

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
      }); */
  },
  updateCartItemQuantity: async (data: FormData) => {
    set({ isLoading: true });

    const user = useUserStore.getState().user;
    const { cart, localCart } = useOrdersStore.getState();

    const cartItemId = data.get("product-id");
    const cartItem = (user ? cart : localCart)?.items.find(
      (item) => item._id === cartItemId
    );
    const count = Number(data.get("quantity")) - (cartItem?.count || 0);

    console.log(Math.abs(count), cartItem?.count || 0);

    if (!user && localCart) {
      if (Math.abs(count) === (cartItem?.count || 0)) {
        toast.error("Invalid item quantity");
      }

      const cartItemIndex = localCart.items.findIndex(
        (item) => item._id === cartItemId
      );

      if (cartItem) {
        const updatedItems = [...localCart.items];
        updatedItems[cartItemIndex] = {
          ...cartItem,
          count: cartItem.count + (count || 1),
        };
        const updatedCart = { ...localCart, items: updatedItems };
        toast.success("Item quantity updated");

        set({ localCart: updatedCart });
        localStorage.setItem("cart", JSON.stringify(updatedCart));
      }

      set({ isLoading: false });
      // const updatedItems = [...localCart.items];
    } else {
      // do something
    }
    /* const productId = data.get("product-id");
    const product = useOrdersStore
      .getState()
      .cart.items.find((item) => item.product._id === productId);
    const count = Number(data.get("quantity")) - (product?.count || 0);

    if (
      Number(data.get("quantity")) !== 0 &&
      Number(data.get("quantity")) !== (product?.count || 0)
    ) {
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
          toast.success("Succesfully Updated Item Quantity");
        })
        .catch((e) => {
          console.log(e);
          set({ isError: true });
          toast.success("Succesfully Added Item to Cart");
        })
        .finally(() => {
          set({ isLoading: false });
        });
    } */
  },
  deleteCartItem: async (cartItemId: string) => {
    const user = useUserStore.getState().user;
    const { cart, localCart } = useOrdersStore.getState();

    if (!user && localCart) {
      const updatedCart = {
        ...localCart,
        items: localCart.items.filter((item) => item._id !== cartItemId),
      };
      toast.success("Item deleted 🗑");

      set({ localCart: updatedCart });
      localStorage.setItem("cart", JSON.stringify(updatedCart));
    }
    /* const config = {
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
      }); */
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
  getOrders: async () => {
    set({ isLoading: true });
    const config = {
      headers: {
        Authorization: `Bearer ${useUserStore.getState().user?.token}`,
      },
    };

    await axios
      .get(`${API_URL}/`, config)
      .then((res) => {
        set({ orders: res.data });
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
  getAddresses: async () => {
    set({ isLoading: true });
    const config = {
      headers: {
        Authorization: `Bearer ${useUserStore.getState().user?.token}`,
      },
    };

    await axios
      .get(`${API_URL}/address`, config)
      .then((res) => {
        set({ addresses: res.data });
      })
      .catch((e) => {
        console.log(e);
        set({ isError: true });
      })
      .finally(() => {
        set({ isLoading: false });
      });
  },
  createAddress: async (data: FormData) => {
    data.delete("_id");

    let addressData: any = {};
    data.forEach((value, key) => (addressData[key] = value));

    const config = {
      headers: {
        Authorization: `Bearer ${useUserStore.getState().user?.token}`,
      },
    };

    await axios
      .post(`${API_URL}/address`, addressData, config)
      .then((res) => {
        console.log(res);
        set({ addresses: [...useOrdersStore().addresses, res.data] });
      })
      .catch((e) => {
        console.log(e);
        set({ isError: true });
      })
      .finally(() => {
        set({ isLoading: false });
      });
  },
  updateAddress: async (data: FormData) => {
    let addressId = data.get("_id");

    let addressData: any = {};
    data.forEach((value, key) => (addressData[key] = value));

    const config = {
      headers: {
        Authorization: `Bearer ${useUserStore.getState().user?.token}`,
      },
    };

    await axios
      .put(`${API_URL}/address/${addressId}`, addressData, config)
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
  deleteAddress: async (id: string) => {
    const config = {
      headers: {
        Authorization: `Bearer ${useUserStore.getState().user?.token}`,
      },
    };

    await axios
      .delete(`${API_URL}/address/${id}`, config)
      .then((res) => {
        console.log(res);
        set({
          addresses: useOrdersStore().addresses.filter(
            (address) => address._id !== id
          ),
        });
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
