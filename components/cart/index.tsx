"use client";

import { useOrdersStore } from "@/state/orders";
import Image from "next/image";
import { ChangeEvent, useEffect, useMemo, useState } from "react";

function CartItemQuantity({ item }: { item: CartItem }) {
  const [quantity, setQuantity] = useState<number>(item.count);

  const { addToCart, updateCartItemQuantity } = useOrdersStore();

  useEffect(() => {
    setQuantity(item.count);
  }, [item.count]);

  return (
    <form
      method="POST"
      action={updateCartItemQuantity}
      className="max-w-xs mx-auto"
    >
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
  return (
    <a
      href="#"
      className="flex flex-col items-center bg-white border border-gray-200 rounded-lg shadow md:flex-row md:max-w-xl hover:bg-gray-100 dark:border-gray-700 dark:bg-gray-800 dark:hover:bg-gray-700"
    >
      <Image
        className="object-cover w-full rounded-t-lg h-96 md:h-auto md:w-48 md:rounded-none md:rounded-s-lg"
        src={
          item.product.image
            ? item.product.image
            : "/docs/images/blog/image-4.jpg"
        }
        width={100}
        height={100}
        alt="Cart Item"
      />
      <div className="flex flex-col justify-between p-4 leading-normal">
        <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
          {item.product.name}{" "}
          {item.product.attribute ? ` - ${item.product.attribute}` : ""}
        </h5>
        <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">
          {item.count}
        </p>
        <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">
          {item.price * item.count}
        </p>
        <CartItemQuantity item={item} />
      </div>
    </a>
  );
}

type CartProps = {
  cart: Order;
};

export default function Cart({ cart }: { cart: Order }) {
  return (
    <div className="overflow-scroll">
      {cart.items.map((cartItem, index) => {
        return <CartItem item={cartItem} key={index} />;
      })}
    </div>
  );
}
