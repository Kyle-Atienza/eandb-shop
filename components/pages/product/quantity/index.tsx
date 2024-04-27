import { Button } from "@/components/common/button";
import { Label } from "@/components/common/label";
import { useOrdersStore } from "@/state/orders";
import { ChangeEvent, ReactNode, useEffect, useState } from "react";

import {
  buttonColorClassName,
  textColorClassName,
  inputSize,
  borderColorClassName,
} from "@/utils/classnames";

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
      disabled={disabled}
      className={`transition-colors rounded-sm ${
        size ? `spaced-${size}` : "spaced-md"
      } hover:bg-primary font-gopher disabled:opacity-50 ${buttonColorClassName(
        color
      )}`}
      onClick={(e) => {
        onClick;
      }}
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
  const { addToCart, updateCartItemQuantity } = useOrdersStore();

  const [cartItemQuantity, setCartItemQuantity] = useState<number>(quantity);

  useEffect(() => {
    onChange ? onChange(cartItemQuantity) : null;
  }, [cartItemQuantity]);

  useEffect(() => {
    setCartItemQuantity(quantity);
  }, [quantity]);

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
      {label ? (
        <label htmlFor="flavors" className="">
          <Label>Quantity:</Label>
        </label>
      ) : null}
      <div className="flex gap-spaced-md">
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
                : () => setCartItemQuantity!(cartItemQuantity - 1)
            }
          >
            -
          </QuantityButton>
          <input
            name="quantity"
            className={`${inputSize(size)} text-center bg-[transparent] ${
              size ? `spaced-${size}` : "spaced-md"
            } ${textColorClassName(color)}`}
            value={cartItemQuantity}
            onChange={(e: ChangeEvent<HTMLInputElement>) =>
              setCartItemQuantity(Number(e.target.value))
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
                : () => setCartItemQuantity!(cartItemQuantity + 1)
            }
          >
            +
          </QuantityButton>
        </div>
        {deleteButton ? (
          <button
            className={`transition-colors rounded-sm w-16 ${
              size ? `spaced-${size}` : "spaced-md"
            } hover:bg-primary font-gopher ${buttonColorClassName(color)}`}
            // onClick={() => onChange(quantity + 1)}
          >
            <i className={`bi bi-trash text-2xl`}></i>
          </button>
        ) : null}
      </div>
    </form>
  );
}
