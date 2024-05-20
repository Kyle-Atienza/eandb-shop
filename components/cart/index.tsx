"use client";

import { CartItem } from "./item";
import Link from "next/link";
import { useProductsStore } from "@/state/products";
import { useEffect } from "react";
import { useCart } from "@/hooks/useCart";

export function CartItems() {
  const { getCartItemData, cartItems } = useCart();

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
  const { getCartItemData, cartItems, isCartLoading } = useCart();

  const { items, getProductItems } = useProductsStore();

  useEffect(() => {
    if (!items.length) {
      getProductItems();
    }
  }, []);

  const totalAmount = cartItems?.reduce((total, cartItem) => {
    total += cartItem.count * (getCartItemData(cartItem._id)?.amount || 0);
    return total;
  }, 0);

  return (
    <>
      {isCartLoading ? (
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
