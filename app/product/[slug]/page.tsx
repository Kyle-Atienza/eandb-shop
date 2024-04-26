"use client";

import { useProductsStore } from "@/state/products";
import { useOrdersStore } from "@/state/orders";

import { ChangeEvent, useEffect, useState } from "react";

import { parseProductListItemId } from "@/utils/products";

import Image from "next/image";

import { Label } from "@/components/common/label";
import { ProductQuantity } from "@/components/pages/product/quantity";
import { ProductOptions } from "@/components/pages/product/options";

const setInitalProductOptions = (
  product: ProductListingItem
): ProductOptionSelectItem[] => {
  return product?.options.reduce((options: any, option, index) => {
    option.attributes.forEach((optionListItem) => {
      const { type } = optionListItem;
      const optionValue = {
        ...optionListItem,
        _id: option._id,
        selected: !index,
      };
      const existingOption = options.find((opt: any) => opt.name === type);

      if (!existingOption) {
        options.push({
          name: type,
          options: [optionValue],
        });
      } else {
        existingOption.options.push(optionValue);
      }
    });

    return options;
  }, []);
};

export default function Page({ params }: { params: { slug: string } }) {
  const { productList, getProductList } = useProductsStore();
  const { addToCart } = useOrdersStore();

  const product: ProductListingItem = productList.find(
    (listItem) => parseProductListItemId(listItem._id) === params.slug
  )!;

  const [productOptions, setProductOptions] =
    useState<ProductOptionSelectItem[]>();
  const selectedOptions = productOptions?.map(
    (option) =>
      option.options.find((selectedOption) => selectedOption.selected)?.value
  );

  const productItem = product?.options.find((productOption: ProductItem) => {
    const productItemAttributes = productOption.attributes.map(
      (attribute) => attribute.value
    );

    return productItemAttributes.every(
      (value, index) => value === selectedOptions?.sort()[index]
    );
  });

  const getSelectedOption = (name: string) => {
    if (productOptions) {
      return productOptions
        .find((option) => option.name === name)
        ?.options.find((option) => !!option.selected);
    }
  };

  const onChageProductOption = (value: string, optionName?: string) => {
    setProductOptions(
      productOptions?.map((productOption) => {
        if (productOption.name === optionName) {
          productOption.options.forEach((optionItem) => {
            optionItem.selected = optionItem.value === value;
          });
        }
        return productOption;
      })
    );
  };

  useEffect(() => {
    if (productList.length) {
      setProductOptions(setInitalProductOptions(product));
    } else {
      getProductList();
    }
  }, [productList, product]);

  return (
    <div className="flex h-full gap-spaced">
      <div className="flex flex-col flex-1 sticky top-[100px] h-[calc(100vh-100px)] spaced-b">
        <div className="relative w-full h-full overflow-hidden rounded bg-light">
          {/* {product?.details.gallery[0] ? (
            <Image
              src={product?.details.gallery[0]}
              fill
              alt={`${product.name} image`}
              objectFit="cover"
              priority
            />
          ) : null} */}
        </div>
        {/* <div>{product?.amount}</div>
        <button
          className="self-start p-2 bg-dark text-light"
          onClick={() => addToCart(product?._id ?? "")}
        >
          Add to Cart
        </button> */}
      </div>
      <div className="flex flex-col flex-1 gap-spaced h-[200vh]">
        <div className="flex flex-col gap-spaced-sm">
          <h1 className="text-5xl text-light font-ranille">{product?._id}</h1>
          <h2 className="text-3xl text-light font-ranille flex gap-2 items-baseline">
            {productItem?.amount.toFixed(2)}
            <span className="">
              <Label>PHP</Label>
            </span>
          </h2>
          <p className="text-md font-gopher text-light">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim
            ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut
            aliquip ex ea commodo consequat. Duis aute irure dolor in
            reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
            pariatur. Excepteur sint occaecat cupidatat non proident, sunt in
            culpa qui officia deserunt mollit anim id est laborum.
          </p>
        </div>
        <div className="w-full h-[1px] divider bg-light" />
        <div className="flex flex-col gap-spaced">
          {productOptions?.map((productOption, index) => {
            return (
              <ProductOptions
                key={index}
                productOption={productOption}
                value={getSelectedOption(productOption.name)?.value || ""}
                onSelect={(e: any) =>
                  onChageProductOption(e.target.value, productOption.name)
                }
              />
            );
          })}
          <ProductQuantity />
        </div>
        <div className="sticky bottom-0 flex mt-auto spaced-b">
          <button
            className="w-full transition-colors rounded bg-light spaced-md text-dark hover:bg-primary font-gopher"
            onClick={() => addToCart(productItem?._id ?? "")}
          >
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
}
