"use client";

import { useOrdersStore } from "@/state/orders";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { ChangeEvent, useEffect, useMemo, useState } from "react";
import { Button, TransitionButton } from "../common/button";
import { ProductQuantity } from "../pages/product/quantity";
import { Divider } from "../decorations/divider";
import { Label } from "../common/label";

function CartItem({ item }: { item: CartItem }) {
  const rotation = Math.random() * 18 - 8;
  const quantity: number = item.count;

  return (
    <div className="flex flex-col bg-white lg:flex-row gap-space-md">
      {/* {item?.product?.gallery?.length ? (
        <Image
          className="object-cover w-full rounded-t-lg h-96 md:h-auto md:w-48 md:rounded-none md:rounded-s-lg"
          src={
            item.product.gallery[0]
              ? item.product.gallery[0]
              : "/docs/images/blog/image-4.jpg"
          }
          width={100}
          height={100}
          alt="Cart Item"
        />
      ) : null} */}
      <div className="w-[130px]">
        <div
          className="w-full rounded-sm aspect-square bg-dark"
          style={{ rotate: `${rotation}deg` }}
        ></div>
      </div>
      <div className="flex items-start flex-1 leading-normal gap-spaced-md">
        <div className="flex flex-col gap-spaced-xs">
          <h5 className="text-2xl tracking-tight text-gray-900 font-gopher dark:text-white">
            {item.product.details.name}
            {item.product.name ? ` - ${item.product.name}` : ""}
          </h5>
          <div className="flex items-start">
            {item.product.attributes.length
              ? item.product.attributes.map((attribute, index) => {
                  return (
                    <div
                      key={index}
                      className="rounded-md bg-secondary text-tertiary spaced-sm tracking-[0.1em]"
                    >
                      <p className="text-xs lg:text-md font-gopher uppercase">
                        {attribute.value}
                      </p>
                    </div>
                  );
                })
              : null}
          </div>
        </div>
        <div className="flex flex-col items-end mt-auto gap-spaced-sm ms-auto">
          <div className="rounded-md bg-tertiary text-light spaced-sm">
            <p className="text-xs lg:text-base font-gopher">
              {(item.price * item.count).toFixed(2)}{" "}
              <Label>
                <span className="text-[0.8em]">PHP</span>
              </Label>
            </p>
          </div>
          <ProductQuantity
            color="tertiary"
            size="sm"
            deleteButton
            label={false}
            quantity={quantity}
            cartItemId={item.product._id}
          />
        </div>
      </div>
    </div>
  );
}

export default function Cart() {
  const router = useRouter();

  const { cart } = useOrdersStore();

  const totalAmount = cart.items.reduce((total, cartItem) => {
    total += cartItem.count * cartItem.price;
    return total;
  }, 0);

  return (
    <div className="flex flex-col flex-1 h-full overflow-hidden spaced-y *:spaced-x">
      <div className="flex items-end justify-between">
        <h3 className="text-2xl font-ranille text-dark lg:text-4xl">
          Your Cart
        </h3>
        <h2 className="flex items-baseline gap-2 text-3xl text-dark font-ranille">
          {totalAmount.toFixed(2)}
          <span className="">
            <Label>PHP</Label>
          </span>
        </h2>
      </div>
      <div className="flex-1 spaced-t-md overflow-auto spaced-t-">
        <div className="flex flex-col gap-spaced">
          {cart.items.map((cartItem, index) => {
            return (
              <>
                <CartItem item={cartItem} key={index} />
              </>
            );
          })}
        </div>
      </div>
      <div>
        <TransitionButton
          className="flex justify-center w-full"
          color="tertiary"
          href="/checkout"
        >
          Checkout
        </TransitionButton>
      </div>
      {/* <p>Total Amount: {totalAmount}</p> */}
    </div>
  );
}
