import { useOrdersStore } from "@/state/orders";
import { ChangeEvent } from "react";

export function ProductQuantity({
  quantity,
  onChange,
}: {
  quantity: number;
  onChange: (val: number) => void;
}) {
  const { updateCartItemQuantity, addToCart, deleteCartItem, isLoading } =
    useOrdersStore();

  return (
    <div className="flex font-merchant text-light h-full spaced-y-md">
      <button
        disabled={isLoading}
        className="w-14 disabled:opacity-50 disabled:pointer-events-none"
        onClick={() => onChange(1)}
      >
        <i className="bi bi-caret-up-fill text-light"></i>
      </button>
      <form className="flex-1 text-center" action={updateCartItemQuantity}>
        <input
          disabled={isLoading}
          type="text"
          name="quantity"
          value={`QTY: ${quantity}`}
          className="w-24 bg-[transparent] text-center text-xl lg:text-2xl disabled:opacity-50 disabled:pointer-events-none"
          onChange={(e: ChangeEvent<HTMLInputElement>) => {
            const re = /^[0-9\b]+$/;

            if (
              e.target.value === "" ||
              re.test(e.target.value) ||
              Number(e.target.value) > 0
            ) {
              onChange(Number(e.target.value) - quantity);
            }
          }}
        />
        <button type="submit" className="hidden"></button>
      </form>
      <button
        disabled={isLoading}
        className="w-14 disabled:opacity-50 disabled:pointer-events-none"
        onClick={() => (quantity > 1 ? onChange(-1) : null)}
      >
        <i
          className={`bi bi-caret-down-fill text-light ${
            quantity === 1 ? "text-danger" : ""
          }`}
        ></i>
      </button>
    </div>
  );
}
