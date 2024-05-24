"use client";

import { Label } from "@/components/common/label";
import { useState } from "react";
import { ProductOptions } from "../options";
import { ProductQuantity } from "../quantity";
import { setInitalProductOptions } from "@/utils/products";
import { useOrdersStore } from "@/state/orders";

export function ProductSelect({
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
          const item = productOptions[0]
            ? productOptions[0].options.find((option) => option.selected)
            : productItem;

          if (item) {
            addToCart(item._id, quantity);
            setQuantity(1);
          }
        }}
      >
        <Label> Add to Cart</Label>
      </button>
    </>
  );
}
