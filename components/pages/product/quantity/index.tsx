import { Label } from "@/components/common/label";
import { useOrdersStore } from "@/state/orders";
import { ChangeEvent, ReactNode, useEffect, useState } from "react";

import {
  buttonColorClassName,
  textColorClassName,
  inputSize,
  borderColorClassName,
} from "@/utils/classnames";
import toast from "react-hot-toast";

const re = /^[0-9\b]+$/;

function QuantityButton({
  size,
  color,
  onClick,
  children,
  disabled = false,
}: {
  size?: "sm";
  color?: "dark" | "base" | "light" | "primary";
  onClick?: React.MouseEventHandler;
  children: ReactNode;
  disabled?: boolean;
}) {
  return (
    <button
      type="button"
      disabled={disabled}
      className={`transition-colors rounded-sm ${
        size ? `spaced-${size}` : "spaced-md"
      } hover:bg-primary font-gopher disabled:opacity-50 ${buttonColorClassName(
        color
      )}`}
      onClick={onClick}
    >
      {children}
    </button>
  );
}

export function ProductQuantity({
  quantity,
  color,
  border = true,
  size,
  deleteButton,
  label = true,
  cartItemId,
  onChange,
}: {
  color?: "dark" | "base" | "light" | "primary";
  border?: boolean;
  size?: "sm";
  deleteButton?: boolean;
  label?: boolean;
  //
  quantity: number;
  onChange?: (val: number) => void;
  //
  cartItemId?: string;
}) {
  const {
    addToCart,
    updateCartItemQuantity,
    deleteCartItem,
    message,
    isLoading,
    isError,
    cart,
  } = useOrdersStore();

  const [productItemQuantity, setProductItemQuantity] =
    useState<number>(quantity);

  useEffect(() => {
    onChange ? onChange(productItemQuantity) : null;
  }, [productItemQuantity]);

  useEffect(() => {
    setProductItemQuantity(quantity);
  }, [quantity]);

  useEffect(() => {
    if (!isLoading && !isError && cart.items.length) {
      /* toast.dismiss();
      toast.success(message); */
    }
  }, [isLoading, message]);

  return (
    <form
      method="POST"
      action={cartItemId ? updateCartItemQuantity : () => {}}
      className={`flex flex-col gap-spaced-sm w-min ${textColorClassName(
        color
      )}`}
    >
      {cartItemId ? (
        <input
          type="text"
          name="product-id"
          id="product-id"
          className="hidden"
          value={cartItemId}
        />
      ) : null}
      <button type="submit" className="hidden"></button>
      {label ? (
        <label htmlFor="flavors" className="">
          <Label>Quantity:</Label>
        </label>
      ) : null}
      <div className="flex gap-spaced-xs">
        <div
          className={`flex ${
            border ? "border-2 rounded-md spaced-sm" : ""
          }  ${borderColorClassName(color)}`}
        >
          <QuantityButton
            disabled={quantity < 2}
            color={color}
            size={size}
            onClick={
              cartItemId
                ? () => addToCart(cartItemId, -1)
                : () => setProductItemQuantity!(productItemQuantity - 1)
            }
          >
            -
          </QuantityButton>
          <input
            name="quantity"
            className={`text-center bg-[transparent] ${
              size ? `spaced-${size}` : "spaced-md"
            } ${textColorClassName(color)} w-14`}
            value={productItemQuantity}
            onChange={(e: ChangeEvent<HTMLInputElement>) =>
              setProductItemQuantity(Number(e.target.value))
            }
            type="text"
            id="quantity"
          />
          <QuantityButton
            color={color}
            size={size}
            onClick={
              cartItemId
                ? () => addToCart(cartItemId, 1)
                : () => setProductItemQuantity!(productItemQuantity + 1)
            }
          >
            +
          </QuantityButton>
        </div>
        {deleteButton && cartItemId ? (
          <button
            type="button"
            className={`transition-colors rounded-sm w-16 ${
              size ? `spaced-${size}` : "spaced-md"
            } hover:bg-primary font-gopher ${buttonColorClassName(color)}`}
            onClick={() => deleteCartItem(cartItemId)}
          >
            <i className={`bi bi-trash text-2xl`}></i>
          </button>
        ) : null}
      </div>
    </form>
  );
}
