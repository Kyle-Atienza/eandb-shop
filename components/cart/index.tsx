"use client";

import { CartItem } from "./item";
import Link from "next/link";
import { useOrdersStore } from "@/state/orders";
import { useUserStore } from "@/state/user";
import { getCartItemData } from "@/utils/cart";
import { useProductsStore } from "@/state/products";
import { useEffect } from "react";

export function CartItems() {
  const { items } = useProductsStore();
  const { cart, localCart } = useOrdersStore();
  const { user } = useUserStore();

  const cartItems = (user ? cart : localCart)?.items;

  return (
    <>
      {cartItems?.map((cartItem, index) => {
        const itemData = getCartItemData(items, cartItem.productItemId);

        if (itemData) {
          return (
            <CartItem key={index} item={itemData} quantity={cartItem.count} />
          );
        }
      })}
    </>
  );
}

export function CartCheckout() {
  const { items } = useProductsStore();
  const { cart, localCart } = useOrdersStore();
  const { user } = useUserStore();

  const cartItems = (user ? cart : localCart)?.items;

  const totalAmount = cartItems?.reduce((total, cartItem) => {
    total +=
      cartItem.count *
      (getCartItemData(items, cartItem.productItemId)?.amount || 0);
    return total;
  }, 0);

  return (
    <div className="border-t-2 border-light flex text-3xl font-merchant *:leading-[0.7em]">
      <div className="w-full  spaced-x spaced-y-md gap-spaced-xs bg-light flex text-dark flex-col items-center justify-center">
        <div>P{totalAmount?.toFixed(2)}</div>
        <div className="uppercase text-[0.8em] tracking-widest">Total </div>
      </div>
      <Link
        href={"/checkout"}
        className="bg-tertiary spaced-x-md lg:spaced-x text-light hover:bg-primary transition-colors flex items-center"
      >
        Checkout
      </Link>
    </div>
  );
}

export default function Cart() {
  const { items, isLoading, isError, getProductItems } = useProductsStore();

  const isCartLoading = !items.length && isLoading && !isError;

  useEffect(() => {
    if (!items.length) {
      getProductItems();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      {isCartLoading ? (
        <p>Loading</p>
      ) : (
        <div className="relative flex flex-col w-full h-full overflow-auto bg-tertiary">
          {/* <div className="cart flex-1 bg-tertiary overflow-auto">
          </div> */}
          <table className="">
            <tbody>
              <CartItems />
            </tbody>
          </table>
        </div>
      )}
    </>
  );
}
