"use client";

import { useOrdersStore } from "@/state/orders";
import { useUserStore } from "@/state/user";

export function CartDrawerToggle() {
  const { cart, localCart } = useOrdersStore();
  const { user } = useUserStore();

  const cartItems = (user ? cart : localCart)?.items;

  return (
    <>
      {cartItems?.length ? (
        <div className="absolute top-0 right-0 w-4 text-xs rounded-full aspect-square bg-dark font-gopher">
          {cartItems?.length}
        </div>
      ) : null}
      <i className={`bi bi-cart`}></i>
    </>
  );
}
