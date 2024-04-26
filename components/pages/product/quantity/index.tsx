import { Label } from "@/components/common/label";
import { ChangeEvent, useState } from "react";

const re = /^[0-9\b]+$/;

export function ProductQuantity({
  quantity,
  onChange,
}: {
  quantity: number;
  onChange: (val: number) => void;
}) {
  // const [quantity, setQuantity] = useState<number>(1);

  return (
    <div className="flex flex-col gap-spaced-sm w-min">
      {/* TODO: validation for stock */}
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
