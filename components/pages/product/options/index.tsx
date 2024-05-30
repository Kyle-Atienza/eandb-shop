"use client";

import { Label } from "@/components/common/label";
import { ChangeEvent, ChangeEventHandler, useState } from "react";

// not used

export function ProductListingOptions({
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
      {/* <div className="flex flex-col gap-spaced-sm">
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
      </div> */}
    </>
  );
}

export function ProductListingOptions({
  ProductListingOptions,
  onSelect,
}: {
  ProductListingOptions: ProductOptionSelectItem[];
  onSelect: (val: ProductOptionSelectItem[]) => void;
}) {
  const getSelectedOption = (name: string) => {
    if (ProductListingOptions) {
      return ProductListingOptions.find(
        (option) => option.name === name
      )?.options.find((option) => !!option.selected);
    }
  };

  const onChageProductOption = (value: string, optionName?: string) => {
    /* return ProductListingOptions?.map((productOption) => {
      if (productOption.name === optionName) {
        productOption.options.forEach((optionItem) => {
          optionItem.selected = optionItem.value === value;
        });
      }
      return productOption;
    }); */
  };

  return (
    <>
      {/* {ProductListingOptions?.map((productOption, index) => {
        return (
          <ProductListingOptions
            key={index}
            productOption={productOption}
            value={getSelectedOption(productOption.name)?.value || ""}
            onSelect={(e) =>
              onSelect(onChageProductOption(e.target.value, productOption.name))
            }
          />
        );
      })} */}
    </>
  );
}
