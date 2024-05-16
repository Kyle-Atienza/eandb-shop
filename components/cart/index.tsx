"use client";

import { useOrdersStore } from "@/state/orders";
import { useRouter } from "next/navigation";
import { TransitionButton } from "../common/button";
import { Label } from "../common/label";
import { CartItem } from "./item";

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
        <div className="cart flex-1 bg-tertiary overflow-auto border-collapse">
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
        <div className="relative z-10 w-full bg-light spaced">Hello</div>
      </div>
    </>
  );
}
