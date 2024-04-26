import { Label } from "@/components/common/label";
import { ChangeEvent, ChangeEventHandler } from "react";

export function ProductOptions({
  productOption,
  value,
  onSelect,
}: {
  productOption: ProductOptionSelectItem;
  value: string;
  onSelect: ChangeEventHandler<HTMLSelectElement>;
}) {
  return (
    <>
      {/* select component (no functionality) */}
      <div className="flex flex-col gap-spaced-sm">
        <label htmlFor={productOption.name} className="text-light">
          <Label>{productOption.name}: </Label>
        </label>
        <div className="flex rounded-md spaced-sm bg-light">
          <select
            className="w-full font-gopher focus:outline-0"
            name={productOption.name}
            id={productOption.name}
            value={value}
            onChange={onSelect}
          >
            {productOption.options.map((option, index) => {
              return (
                <option value={option.value} key={index}>
                  {option.value}
                </option>
              );
            })}
          </select>
        </div>
      </div>
    </>
  );
}
