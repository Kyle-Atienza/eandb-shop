"use client";

import { useOrdersStore } from "@/state/orders";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { ChangeEvent, useEffect, useMemo, useState } from "react";
import { Button } from "../common/button";
import { ProductQuantity } from "../pages/product/quantity";
import { Divider } from "../decorations/divider";

function CartItemQuantity({ item }: { item: CartItem }) {
  const [quantity, setQuantity] = useState<number>(item.count);

  const { addToCart, updateCartItemQuantity } = useOrdersStore();

  useEffect(() => {
    setQuantity(item.count);
  }, [item.count]);

  return (
    <form method="POST" action={updateCartItemQuantity} className="max-w-xs">
      <div className="relative flex items-center max-w-[8rem]">
        <button
          onClick={() => addToCart(item.product._id, -1)}
          disabled={item.count === 1}
          type="button"
          id="decrement-button"
          data-input-counter-decrement="quantity-input"
          className="disabled:opacity-40 bg-gray-100 dark:bg-gray-700 dark:hover:bg-gray-600 dark:border-gray-600 hover:bg-gray-200 border border-gray-300 rounded-s-lg p-3 h-11 focus:ring-gray-100 dark:focus:ring-gray-700 focus:ring-2 focus:outline-none"
        >
          <svg
            className="w-3 h-3 text-gray-900 dark:text-white"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 18 2"
          >
            <path
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M1 1h16"
            />
          </svg>
        </button>
        <input
          type="text"
          name="product-id"
          id="product-id"
          className="hidden"
          value={item.product._id}
          onChange={() => {}}
        />
        <input
          name="quantity"
          type="number"
          id="quantity-input"
          data-input-counter
          data-input-counter-min="1"
          data-input-counter-max="50"
          aria-describedby="helper-text-explanation"
          className="bg-gray-50 border-x-0 border-gray-300 h-11 text-center text-gray-900 text-sm focus:ring-blue-500 focus:border-blue-500 block w-full py-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          placeholder="999"
          value={quantity}
          onChange={(e: ChangeEvent<HTMLInputElement>) =>
            setQuantity(Number(e.target.value))
          }
          required
        />
        <button
          onClick={() => addToCart(item.product._id, 1)}
          type="button"
          id="increment-button"
          data-input-counter-increment="quantity-input"
          className="disabled:opacity-40 bg-gray-100 dark:bg-gray-700 dark:hover:bg-gray-600 dark:border-gray-600 hover:bg-gray-200 border border-gray-300 rounded-e-lg p-3 h-11 focus:ring-gray-100 dark:focus:ring-gray-700 focus:ring-2 focus:outline-none"
        >
          <svg
            className="w-3 h-3 text-gray-900 dark:text-white"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 18 18"
          >
            <path
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M9 1v16M1 9h16"
            />
          </svg>
        </button>
        <button type="submit" className="hidden"></button>
      </div>
    </form>
  );
}

function CartItem({ item }: { item: CartItem }) {
  const [quantity, setQuantity] = useState<number>(item.count);
  const { deleteCartItem } = useOrdersStore();

  useEffect(() => {
    console.log("quantity updated", quantity);
  }, [quantity]);

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
      <div className="flex-1 items-start justify-between gap-spaced-xs leading-normal">
        <h5 className="mb-2 text-2xl font-gopher tracking-tight text-gray-900 dark:text-white">
          {item.product.details.name}
          {item.product.name ? ` - ${item.product.name}` : ""}
        </h5>
        <div className="flex flex-col gap-spaced-xs items-start">
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
              {item.price * item.count}
            </p>
          </div>
          <div className="flex gap-spaced-sm">
            {/* <CartItemQuantity item={item} /> */}
            <ProductQuantity
              color="base"
              quantity={quantity}
              onChange={(val) => setQuantity(val)}
              size="sm"
              deleteButton
              label={false}
            />
            {/* <button
            onClick={() => deleteCartItem(item.product._id)}
            className="self-start p-2 bg-dark text-light"
          >
            Delete
          </button> */}
          </div>
        </div>
      </div>
    </div>
  );
}

type CartProps = {
  cart: Order;
};

export default function Cart() {
  const router = useRouter();

  const { cart } = useOrdersStore();

  const totalAmount = cart.items.reduce((total, cartItem) => {
    total += cartItem.count * cartItem.price;
    return total;
  }, 0);

  return (
    <div className="flex flex-col gap-spaced-md">
      <div className="flex justify-between items-end">
        <h3 className="font-ranille text-dark text-2xl lg:text-4xl">
          Your Cart
        </h3>
        <Button color="base" onClick={() => router.push("/checkout")}>
          Checkout
        </Button>
      </div>
      <div className="overflow-scroll flex flex-col gap-spaced">
        {cart.items.map((cartItem, index) => {
          return (
            <>
              <CartItem item={cartItem} key={index} />
              {/* <Divider color="base" /> */}
            </>
          );
        })}
        <p>Total Amount: {totalAmount}</p>
      </div>
    </div>
  );
}
