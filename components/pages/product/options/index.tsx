"use client";

import { Label } from "@/components/common/label";
import { ChangeEvent, ChangeEventHandler, useState } from "react";

export function ProductOption({
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
      {/* wtf is this */}
      <div className="flex flex-col gap-spaced-sm">
        <div className="flex spaced-sm">
          <select
            className="w-full font-merchant text-xl lg:text-2xl focus:outline-0 text-center uppercase text-light"
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

export function ProductOptions({
  productOptions,
  onSelect,
}: {
  productOptions: ProductOptionSelectItem[];
  onSelect: (val: ProductOptionSelectItem[]) => void;
}) {
  const getSelectedOption = (name: string) => {
    if (productOptions) {
      return productOptions
        .find((option) => option.name === name)
        ?.options.find((option) => !!option.selected);
    }
  };

  const onChageProductOption = (value: string, optionName?: string) => {
    return productOptions?.map((productOption) => {
      if (productOption.name === optionName) {
        productOption.options.forEach((optionItem) => {
          optionItem.selected = optionItem.value === value;
        });
      }
      return productOption;
    });
  };

  return (
    <>
      {productOptions?.map((productOption, index) => {
        return (
          <ProductOption
            key={index}
            productOption={productOption}
            value={getSelectedOption(productOption.name)?.value || ""}
            onSelect={(e) =>
              onSelect(onChageProductOption(e.target.value, productOption.name))
            }
          />
        );
      })}
    </>
  );
}
