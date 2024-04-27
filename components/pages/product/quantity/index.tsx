import { Button } from "@/components/common/button";
import { Label } from "@/components/common/label";
import { ChangeEvent, useState } from "react";

const re = /^[0-9\b]+$/;

export function ProductQuantity({
  quantity,
  onChange,
  color,
  border = true,
  size,
  deleteButton,
  label = true,
}: {
  quantity: number;
  onChange: (val: number) => void;
  color?: "dark" | "base" | "light" | "primary";
  border?: boolean;
  size?: "sm";
  deleteButton?: boolean;
  label?: boolean;
}) {
  const buttonColorClassName = (
    color?: "dark" | "base" | "light" | "primary"
  ) => {
    if (color) {
      return `bg-${color} text-light`;
    }

    return "bg-light text-dark";
  };

  const borderColorClassName = (
    color?: "dark" | "base" | "light" | "primary"
  ) => {
    if (color) {
      return `border-${color}`;
    }

    return "border-light";
  };

  const textColorClassName = (
    color?: "dark" | "base" | "light" | "primary"
  ) => {
    if (color === "dark") {
      return "text-light";
    }

    return "text-dark";
  };

  const inputSize = (size?: "sm") => {
    if (size === "sm") {
      return "w-14";
    }

    return "w-24";
  };

  return (
    <div
      className={`flex flex-col gap-spaced-sm w-min ${textColorClassName(
        color
      )}`}
    >
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
          <button
            disabled={quantity === 1}
            className={`disabled:opacity-60 transition-colors rounded-sm ${
              size ? `spaced-${size}` : "spaced-md"
            } hover:bg-primary font-gopher ${buttonColorClassName(color)} `}
            onClick={() => onChange(quantity - 1)}
          >
            -
          </button>
          <input
            className={`${inputSize(size)} text-center bg-[transparent] ${
              size ? `spaced-${size}` : "spaced-md"
            } ${textColorClassName(color)}`}
            value={quantity}
            onChange={(e: ChangeEvent<HTMLInputElement>) => {
              if (e.target.value === "" || re.test(e.target.value)) {
                onChange(Number(e.target.value));
              }
            }}
            type="text"
            id="quantity"
          />
          <button
            className={`transition-colors rounded-sm ${
              size ? `spaced-${size}` : "spaced-md"
            } hover:bg-primary font-gopher ${buttonColorClassName(color)}`}
            onClick={() => onChange(quantity + 1)}
          >
            +
          </button>
        </div>
        {deleteButton ? (
          <button
            className={`transition-colors rounded-sm w-16 ${
              size ? `spaced-${size}` : "spaced-md"
            } hover:bg-primary font-gopher ${buttonColorClassName(color)}`}
            onClick={() => onChange(quantity + 1)}
          >
            <i className={`bi bi-trash text-2xl`}></i>
          </button>
        ) : null}
      </div>
    </div>
  );
}
/* 
export function ProductQuantity({
  quantity,
  onChange,
}: {
  quantity: number;
  onChange: (val: number) => void;
}) {
  return (
    <div className="flex flex-col gap-spaced-sm w-min">
      <label htmlFor="flavors" className="text-light">
        <Label>Quantity:</Label>
      </label>
      <div className="flex border-2 rounded-md border-light spaced-sm">
        <button
          disabled={quantity === 1}
          className="disabled:opacity-60 transition-colors rounded-sm bg-light spaced-md text-dark hover:bg-primary font-gopher"
          onClick={() => onChange(quantity - 1)}
        >
          -
        </button>
        <input
          className="w-24 text-center bg-base text-light spaced-md"
          value={quantity}
          onChange={(e: ChangeEvent<HTMLInputElement>) => {
            if (e.target.value === "" || re.test(e.target.value)) {
              onChange(Number(e.target.value));
            }
          }}
          type="text"
          id="quantity"
        />
        <button
          className="transition-colors rounded-sm bg-light spaced-md text-dark hover:bg-primary font-gopher"
          onClick={() => onChange(quantity + 1)}
        >
          +
        </button>
      </div>
    </div>
  );
}
 */
