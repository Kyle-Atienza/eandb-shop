"use client";

import { useOrdersStore } from "@/state/orders";
import { useState } from "react";

function ReceiptItem({ item }: { item: CartItem }) {
  return (
    <div className="flex items-center justify-between w-full">
      <div className="flex flex-col items-start">
        {/* <p>
          {item?.product?.details?.name} - {item?.product?.name}
        </p> */}
        {/* <p>x{item?.count}</p> */}
        <p className="flex">
          x
          <form action="">
            <input
              type="text"
              value={item.count}
              className="bg-[transparent] focus:outline-none"
            />
          </form>
        </p>
      </div>
      {/* <p>P{(item?.count * item?.price).toFixed(2)}</p> */}
    </div>
  );
}

export function Receipt() {
  const { cart } = useOrdersStore();

  /* const totalAmount = cart.items.reduce((total, item) => {
    total += item.count * item.price;
    return total;
  }, 0); */
  const [fees, setFees] = useState<Fees>({
    delivery: 20,
  });

  return (
    <div className="  bg-light w-[500px] zigzag-top zigzag-bottom font-merchant text-xl">
      <div className="flex flex-col items-center gap-spaced-md spaced-x">
        <p className="text-3xl font-merchant-wide text-center">Order Summary</p>
        {/* <p>05-05-2024 | 4:51 PM</p>
        <div className="border-t-[1px] w-full border-dark border-dashed" />
        <div className="flex justify-between w-full">
          <p className="w-1/2 text-start">Customer Name:</p>
          <p className="w-1/2 text-end">John Doe</p>
        </div>
        <div className="flex justify-between w-full">
          <p className="w-1/2 text-start">Delivery Address:</p>
          <p className="w-1/2 text-end">
            Blk 13 Lot 28, Salinas 1, Bacoor City, Cavite
          </p>
        </div>
        <div className="flex justify-between w-full">
          <p className="w-1/2 text-start">Additional Notes:</p>
          <p className="w-1/2 text-end">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua.
          </p>
        </div>
        <div className="flex justify-between w-full">
          <p className="w-1/2 text-start">Paid Thru:</p>
          <p className="w-1/2 text-end">GCash</p>
        </div> */}
        <div className="border-t-[1px] w-full border-dark border-dashed" />
        {cart.items.map((item, index) => {
          return <ReceiptItem item={item} key={index} />;
        })}
        {/* <ReceiptItem />
        <ReceiptItem /> */}
        <div className="border-t-[1px] w-full border-dark border-dashed" />
        <div className="flex justify-between w-full">
          <p className="w-1/2 text-start">Total Amount:</p>
          {/* <p className="w-1/2 text-end">P{totalAmount.toFixed(2)}</p> */}
        </div>
        <div className="flex justify-between w-full">
          <p className="w-1/2 text-start">Delivery Fee:</p>
          <p className="w-1/2 text-end">P{fees.delivery.toFixed(2)}</p>
        </div>
        <div className="flex justify-between w-full">
          <p className="w-1/2 text-start">Grand Total:</p>
          {/* <p className="w-1/2 text-end">
            P{(totalAmount + fees.delivery).toFixed(2)}
          </p> */}
        </div>
        {/*  <div className="border-t-[1px] w-full border-dark border-dashed" />
        <p className="text-3xl font-merchant-wide">Thank You</p> */}
      </div>
    </div>
  );
}
