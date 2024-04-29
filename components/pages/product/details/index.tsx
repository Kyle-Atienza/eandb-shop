"use client";

import { Label } from "@/components/common/label";
import { Divider } from "@/components/decorations/divider";
import { useState } from "react";
import { ProductOption, ProductOptions } from "../options";
import { ProductQuantity } from "../quantity";
import { ProductRelatedItems } from "../related";
import {
  parseProductListItemId,
  setInitalProductOptions,
} from "@/utils/products";
import { useOrdersStore } from "@/state/orders";

const getRelatedProducts = (
  productList: ProductListingItem[],
  product: ProductListingItem,
  slug: string
) => {
  return productList.filter(
    (listItem) =>
      listItem.details._id === product.details._id &&
      parseProductListItemId(listItem._id) !== slug
  )!;
};

export function ProductDetails({
  productList,
  slug,
  productItem,
  product,
}: {
  productList: ProductListingItem[];
  slug: string;
  productItem: ProductItem;
  product: ProductListingItem;
}) {
  const { addToCart } = useOrdersStore();

  const [quantity, setQuantity] = useState<number>(1);

  const relatedProducts: ProductListingItem[] = getRelatedProducts(
    productList,
    product,
    slug
  );

  const [productOptions, setProductOptions] = useState<
    ProductOptionSelectItem[]
  >(setInitalProductOptions(product));

  return (
    <>
      <div className="flex flex-col gap-spaced">
        <div className="flex flex-col gap-spaced">
          <ProductOptions
            productOptions={productOptions}
            onSelect={(val) => setProductOptions(val)}
          />
          <div className="flex gap-space-md items-end">
            <ProductQuantity
              quantity={quantity}
              onChange={(val) => setQuantity(val)}
              size="sm"
            />
            <button
              className="w-full transition-colors rounded bg-light spaced-md text-dark hover:bg-primary font-gopher"
              onClick={() => {
                addToCart(productItem?._id ?? "", quantity);
                setQuantity(1);
              }}
            >
              Add to Cart
            </button>
          </div>
          <ProductRelatedItems items={relatedProducts} />
        </div>
      </div>
    </>
  );
}
