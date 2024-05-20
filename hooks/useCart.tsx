import { useOrdersStore } from "@/state/orders";
import { useProductsStore } from "@/state/products";
import { useUserStore } from "@/state/user";

export function useCart() {
  const { items, isLoading, isError } = useProductsStore();
  const { cart, localCart } = useOrdersStore();
  const { user } = useUserStore();

  const getCartItemData = (cartItemId: string) => {
    return items.find((item) => item._id === cartItemId);
  };

  const cartItems = (user ? cart : localCart)?.items;
  const isCartLoading = !items.length && isLoading && !isError;

  return { getCartItemData, cartItems, isCartLoading };
}
