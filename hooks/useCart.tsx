import { useOrdersStore } from "@/state/orders";
import { useProductsStore } from "@/state/products";
import { useUserStore } from "@/state/user";
import { useEffect } from "react";

export function useCart() {
  const { items, isLoading, isError, getProductItems } = useProductsStore();
  const { cart, localCart } = useOrdersStore();
  const { user } = useUserStore();

  useEffect(() => {
    if (!items.length) {
      console.log("why");
      getProductItems();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const getCartItemData = (cartItemId: string) => {
    return items.find((item) => item._id === cartItemId);
  };

  const cartItems = (user ? cart : localCart)?.items;
  const isCartLoading = !items.length && isLoading && !isError;

  return { getCartItemData, cartItems, isCartLoading };
}
