"use client";

import { useOrdersStore } from "@/state/orders";
import { useRouter } from "next/navigation";
import { SimpleButton, TransitionButton } from "../common/button";
import { Label } from "../common/label";
import { CartItem } from "./item";
import Link from "next/link";
import { useProductsStore } from "@/state/products";
import { useEffect } from "react";
import { useUserStore } from "@/state/user";

export function CartItems() {
  const { items } = useProductsStore();
  const { cart, localCart } = useOrdersStore();
  const { user } = useUserStore();

  const cartItems = (user ? cart : localCart)?.items;

  const getCartItemData = (cartItemId: string) => {
    return items.find((item) => item._id === cartItemId);
  };

  return (
    <>
      {cartItems?.map((cartItem, index) => {
        const itemData = getCartItemData(cartItem._id);

        if (itemData) {
          return (
            <CartItem key={index} item={itemData} quantity={cartItem.count} />
          );
        }
      })}
    </>
  );
}

export default function Cart() {
  const { cart, localCart } = useOrdersStore();
  const { items, getProductItems, isLoading, isError } = useProductsStore();
  const { user } = useUserStore();

  useEffect(() => {
    if (!items.length) {
      getProductItems();
    }
  }, []);

  const getCartItemData = (cartItemId: string) => {
    return items.find((item) => item._id === cartItemId);
  };
  const cartItems = (user ? cart : localCart)?.items;
  const totalAmount = cartItems?.reduce((total, cartItem) => {
    total += cartItem.count * (getCartItemData(cartItem._id)?.amount || 0);
    return total;
  }, 0);

  return (
    <>
      {!items.length && isLoading && !isError ? (
        <p>Loading</p>
      ) : (
        <div className="relative flex flex-col w-full h-full">
          <div className="cart flex-1 bg-tertiary overflow-auto">
            <table className="">
              <tbody>
                <CartItems />
              </tbody>
            </table>
          </div>
          <div className="border-t-2 border-light flex text-3xl font-merchant">
            <div className="w-full  spaced-x spaced-y-md bg-light  flex justify-between text-dark">
              <div>Total: </div>
              <div>P{totalAmount?.toFixed(2)}</div>
            </div>
            <Link
              href={"/checkout"}
              className="bg-tertiary spaced-x text-light hover:bg-primary transition-colors flex items-center"
            >
              Checkout
            </Link>
          </div>
        </div>
      )}
    </>
  );
}
