"use client";

import { Label } from "@/components/common/label";
import { useState } from "react";
import { ProductOptions } from "../options";
import { ProductQuantity } from "../quantity";
import { setInitalProductOptions } from "@/utils/products";
import { useOrdersStore } from "@/state/orders";
import { HeaderOne } from "@/components/common/header";
import { useProduct } from "@/hooks/useProduct";
import { useProductsStore } from "@/state/products";

export function ProductSelect({
  productItem,
  product,
}: {
  productItem: ProductItem;
  product: ProductListingItem;
}) {
  const { addToCart } = useOrdersStore();
  // const {} = useProduct('')

  const [quantity, setQuantity] = useState<number>(1);

  const [productOptions, setProductOptions] = useState<
    ProductOptionSelectItem[]
  >(setInitalProductOptions(product));
  const selectedItem = productOptions[0]
    ? productOptions[0].options.find((option) => option.selected)
    : productItem;

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
                  P{productItem?.amount.toFixed(2)}
                </Label>
              </div>
              <div className="border-2 border-light spaced-x-sm rounded-sm font-merchant ">
                <Label className="!text-3xl text-light normal-case">
                  {/* {selectedItem.} */}t
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
              {productOptions.length ? (
                <div className="flex items-center *:w-full sm:border-r-2 spaced-y-sm border-t-2 border-light">
                  <ProductOptions
                    productOptions={productOptions}
                    onSelect={(val) => setProductOptions(val)}
                  />
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

/* export function ProductSelect({
  productItem,
  product,
}: {
  productItem: ProductItem;
  product: ProductListingItem;
}) {
  const { addToCart } = useOrdersStore();

  const [quantity, setQuantity] = useState<number>(1);

  const [productOptions, setProductOptions] = useState<
    ProductOptionSelectItem[]
  >(setInitalProductOptions(product));
  const selectedItem = productOptions[0]
    ? productOptions[0].options.find((option) => option.selected)
    : productItem;

  console.log();

  return (
    <>
      <div className="flex flex-col sm:flex-row *:flex-1 items-stretch">
        {productOptions.length ? (
          <div className="flex items-center *:w-full sm:border-r-2 spaced-y-sm border-t-2 border-light">
            <ProductOptions
              productOptions={productOptions}
              onSelect={(val) => setProductOptions(val)}
            />
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
    </>
  );
} */
