"use client";

import { useOrdersStore } from "@/state/orders";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { ChangeEvent, useEffect, useMemo, useState } from "react";
import { Button } from "../common/button";
import { ProductQuantity } from "../pages/product/quantity";
import { Divider } from "../decorations/divider";
import { Label } from "../common/label";

function CartItem({ item }: { item: CartItem }) {
  const quantity: number = item.count;

  return (
    <div className="flex flex-col items≈-center bg-white lg:flex-row gap-space-md">
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
      <div className="w-[180px]">
        <div className="w-full aspect-square bg-dark rounded-md"></div>
      </div>
      <div className="flex-1 flex flex-col items-start xl:justify-between gap-spaced-xs leading-normal">
        <h5 className="mb-2 text-2xl font-gopher tracking-tight text-gray-900 dark:text-white">
          {item.product.details.name}
          {item.product.name ? ` - ${item.product.name}` : ""}
        </h5>
        <div className="flex flex-col xl:flex-row w-full gap-spaced-xs xl:items-end">
          <div className="flex flex-col flex-1 gap-spaced-xs items-start">
            {item.product.attributes.length
              ? item.product.attributes.map((attribute, index) => {
                  return (
                    <div
                      key={index}
                      className="bg-base text-light rounded-md spaced-sm"
                    >
                      <p className="text-xs lg:text-lg font-gopher">
                        {attribute.value}
                      </p>
                    </div>
                  );
                })
              : null}
            <div className="bg-base text-light rounded-md spaced-sm">
              <p className="text-xs lg:text-lg font-gopher">
                {(item.price * item.count).toFixed(2)} <Label>PHP</Label>
              </p>
            </div>
          </div>
          <div className="flex gap-spaced-sm">
            <ProductQuantity
              color="base"
              size="sm"
              deleteButton
              label={false}
              quantity={quantity}
              cartItemId={item.product._id}
            />
          </div>
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
    <div className="flex flex-col flex-1 gap-spaced-md h-full overflow-hidden">
      <div className="flex justify-between items-end">
        <h3 className="font-ranille text-dark text-2xl lg:text-4xl">
          Your Cart
        </h3>
        {/* <Button color="base" onClick={() => router.push("/checkout")}>
          Checkout
        </Button> */}
        {/* <Label>Total: {totalAmount}</Label> */}
        <h2 className="text-3xl text-dark font-ranille flex gap-2 items-baseline">
          {totalAmount.toFixed(2)}
          <span className="">
            <Label>PHP</Label>
          </span>
        </h2>
      </div>
      <div className="flex-1 overflow-auto rounded-md">
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
        <Button
          className="w-full"
          color="base"
          onClick={() => router.push("/checkout")}
        >
          Checkout
        </Button>
      </div>
      {/* <p>Total Amount: {totalAmount}</p> */}
    </div>
  );
}
