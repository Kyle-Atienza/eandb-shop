"use client";

import { Label } from "@/components/common/label";
import { ChangeEvent, useState } from "react";
import { ProductQuantity } from "../quantity";
import { useOrdersStore } from "@/state/orders";
import { HeaderOne } from "@/components/common/header";

export function ProductSelect({ product }: { product: ProductListingItem }) {
  const { addToCart } = useOrdersStore();
  // const {} = useProduct('')

  const [quantity, setQuantity] = useState<number>(1);
  const [productOptions, setProductOptions] = useState<ProductOptionSelect[]>(
    product.options.map((option, index) => ({
      ...option,
      selected: index === 0 ? true : false,
    }))
  );
  const selectedItem = productOptions.find((option) => option.selected);

  return (
    <>
      <div className="spaced lg:sticky top-[100px]">
        <div className="h-fit lg:h-screen flex flex-col">
          <div className="flex flex-col sm:flex-row justify-between spaced-b sm:spaced-none gap-spaced-sm">
            <div className="w-3/5 flex flex-col gap-spaced-md lg:spaced-b">
              <HeaderOne className="">{product?.name}</HeaderOne>
            </div>
            <div className=" flex lg:flex-col gap-spaced-sm items-stretch lg:items-end">
              <div className="bg-light spaced-x-sm rounded-sm font-merchant flex items-center">
                <Label className="!text-3xl">
                  P{selectedItem?.amount.toFixed(2)}
                </Label>
              </div>
              <div className="border-2 border-light spaced-x-sm rounded-sm font-merchant ">
                <Label className="!text-3xl text-light normal-case">
                  {selectedItem?.netWeight}
                </Label>
              </div>
            </div>
          </div>
          <div className="spaced-y border-t-2 border-light text-light text-lg lg:text-2xl 2xl:text-3xl  font-gopher *:mb-3">
            {product.details.description ? (
              <>
                {product.details.description
                  .split("\n")
                  .map((detail, index) => {
                    return <p key={index}>{detail}</p>;
                  })}
              </>
            ) : null}
          </div>
          <div className="">
            <div className="flex flex-col sm:flex-row *:flex-1 items-stretch">
              {productOptions.length > 1 ? (
                <div className="flex items-center *:w-full sm:border-r-2 spaced-y-sm border-t-2 border-light">
                  <select
                    name=""
                    id=""
                    onChange={(e: ChangeEvent<HTMLSelectElement>) => {
                      console.log(e.target.value);
                      setProductOptions((prevState) =>
                        prevState.map((option) => ({
                          ...option,
                          selected:
                            e.target.value === option._id ? true : false,
                        }))
                      );
                    }}
                  >
                    {productOptions.map((option, index) => {
                      return (
                        <option value={option._id} key={index}>
                          {option.attribute.value}
                        </option>
                      );
                    })}
                  </select>
                </div>
              ) : null}
              <div className="flex items-center *:w-full border-t-2 border-light ">
                <ProductQuantity
                  quantity={quantity}
                  onChange={(val) => setQuantity(quantity + val)}
                />
              </div>
            </div>
            <button
              className="border-2 border-light spaced text-center hover:bg-primary transition-colors text-light w-full"
              onClick={() => {
                if (selectedItem) {
                  addToCart(selectedItem._id, quantity);
                  setQuantity(1);
                }
              }}
            >
              <Label> Add to Cart</Label>
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
