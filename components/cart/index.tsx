"use client";

import { useOrdersStore } from "@/state/orders";
import { useRouter } from "next/navigation";
import { SimpleButton, TransitionButton } from "../common/button";
import { Label } from "../common/label";
import { CartItem } from "./item";
import Link from "next/link";

export function CartItems() {
  const { cart } = useOrdersStore();

  return (
    <div className="flex flex-col">
      {cart.items.map((cartItem, index) => {
        return <>{/* <CartItem item={cartItem} key={index} /> */}</>;
      })}
    </div>
  );
}

export default function Cart() {
  const router = useRouter();

  const { cart } = useOrdersStore();

  const totalAmount = cart.items?.reduce((total, cartItem) => {
    total += cartItem.count * cartItem.price;
    return total;
  }, 0);

  return (
    <>
      <div className="relative flex flex-col w-full h-full">
        <div className="cart flex-1 bg-tertiary overflow-auto">
          <table className="">
            <tbody>
              {cart.items.map((cartItem, index) => {
                return (
                  <>
                    <CartItem item={cartItem} key={index} />
                  </>
                );
              })}
            </tbody>
          </table>
        </div>
        <div className="border-t-2 border-light flex text-3xl font-merchant">
          <div className="w-full  spaced-x spaced-y-md bg-light  flex justify-between text-dark">
            <div>Total: </div>
            <div>P{totalAmount.toFixed(2)}</div>
          </div>
          <Link
            href={"/checkout"}
            className="bg-tertiary spaced-x text-light hover:bg-primary transition-colors flex items-center"
          >
            Checkout
          </Link>
        </div>
      </div>
    </>
  );
}
