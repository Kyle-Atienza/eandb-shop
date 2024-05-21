"use client";

import { CartItem } from "./item";
import Link from "next/link";
import { useCart } from "@/hooks/useCart";

export function CartItems() {
  const { getCartItemData, cartItems } = useCart();

  return (
    <>
      {cartItems?.map((cartItem, index) => {
        const itemData = getCartItemData(cartItem.productItemId);

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
  const { getCartItemData, cartItems } = useCart();
  const totalAmount = cartItems?.reduce((total, cartItem) => {
    total +=
      cartItem.count * (getCartItemData(cartItem.productItemId)?.amount || 0);
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
  const { getCartItemData, cartItems, isCartLoading } = useCart();

  const totalAmount = cartItems?.reduce((total, cartItem) => {
    total +=
      cartItem.count * (getCartItemData(cartItem.productItemId)?.amount || 0);
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
          {/* <div className="border-t-2 border-light flex text-3xl font-merchant">
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
          </div> */}
        </div>
      )}
    </>
  );
}
