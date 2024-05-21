"use client";

import { useOrdersStore } from "@/state/orders";
import { useUserStore } from "@/state/user";

export function CartDrawerToggle({
  className,
  countClassName,
}: {
  className?: string;
  countClassName?: string;
}) {
  const { cart, localCart } = useOrdersStore();
  const { user } = useUserStore();

  const cartItems = (user ? cart : localCart)?.items;

  return (
    <div className={className}>
      {cartItems?.length ? (
        <div
          className={`absolute top-0 right-0 w-4 text-xs rounded-full aspect-square bg-dark font-gopher ${countClassName}`}
        >
          {cartItems?.length}
        </div>
      ) : null}
      <i className={`bi bi-cart text-xl`}></i>
    </div>
  );
}
