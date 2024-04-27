"use client";

import { useProductsStore } from "@/state/products";
import { useOrdersStore } from "@/state/orders";

import { ChangeEvent, useEffect, useState } from "react";

import { parseProductListItemId } from "@/utils/products";

import Image from "next/image";

import { Label } from "@/components/common/label";
import { ProductQuantity } from "@/components/pages/product/quantity";
import { ProductOptions } from "@/components/pages/product/options";
import { ProductRelatedItems } from "@/components/pages/product/related";
import { FakeBorderRadius } from "@/components/decorations/fake-border-radius";

const setInitalProductOptions = (
  product: ProductListingItem
): ProductOptionSelectItem[] => {
  return product?.options.reduce(
    (options: ProductOptionSelectItem[], option, index) => {
      option.attributes.forEach((optionListItem) => {
        const { type } = optionListItem;
        const optionValue = {
          ...optionListItem,
          _id: option._id,
          selected: !index,
        };
        const existingOption = options.find(
          (opt: ProductOptionSelectItem) => opt.name === type
        );

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
    },
    []
  );
};

const getProduct = (productList: ProductListingItem[], slug: string) => {
  return productList.find(
    (listItem) => parseProductListItemId(listItem._id) === slug
  )!;
};

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

const getProductItem = (
  product: ProductListingItem,
  selectedOptions: string[]
) => {
  return product?.options.find((productOption: ProductItem) => {
    const productItemAttributes = productOption.attributes.map(
      (attribute) => attribute.value
    );

    return productItemAttributes.every(
      (value, index) => value === selectedOptions?.sort()[index]
    );
  });
};

const getSelectedOptions = (productOptions: ProductOptionSelectItem[]) => {
  return productOptions?.map(
    (option) =>
      option.options.find((selectedOption) => selectedOption.selected)?.value!
  )!;
};

export default function Page({ params }: { params: { slug: string } }) {
  const { productList, getProductList } = useProductsStore();
  const { addToCart } = useOrdersStore();

  const [quantity, setQuantity] = useState<number>(1);
  const [productOptions, setProductOptions] =
    useState<ProductOptionSelectItem[]>();
  // const [productItem, setProductItem] = useState<ProductItem>();
  const product: ProductListingItem = getProduct(productList, params.slug);
  const selectedOptions: string[] = getSelectedOptions(productOptions!);
  const productItem: ProductItem = getProductItem(product, selectedOptions)!;
  const relatedProducts: ProductListingItem[] = getRelatedProducts(
    productList,
    product,
    params.slug
  );

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
      // setProductItem(getProductItem(product, selectedOptions));
    } else {
      getProductList();
    }
    console.log(product, productItem);
  }, [productList, product, productItem]);

  return (
    <div className="flex gap-spaced overflow-hidden h-[calc(100vh-76px)] lg:h-[calc(100vh-100px)]">
      <div className="flex flex-col flex-1  lg:spaced-b">
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
      </div>
      <div className="flex flex-col flex-1 gap-spaced h-full overflow-hidden lg:spaced-b">
        <div className="flex flex-col gap-spaced overflow-auto hide-scrollbar rounded spaced-y">
          <div className="flex flex-col gap-spaced-sm">
            <h1 className="text-5xl text-light font-ranille">
              {product?.name}
            </h1>
            <h2 className="text-3xl text-light font-ranille flex gap-2 items-baseline">
              {productItem?.amount.toFixed(2)}
              <span className="">
                <Label>PHP</Label>
              </span>
            </h2>
            <p className="text-md font-gopher text-light">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
              eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
              enim ad minim veniam, quis nostrud exercitation ullamco laboris
              nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in
              reprehenderit in voluptate velit esse cillum dolore eu fugiat
              nulla pariatur. Excepteur sint occaecat cupidatat non proident,
              sunt in culpa qui officia deserunt mollit anim id est laborum.
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
                  onSelect={(e) =>
                    onChageProductOption(e.target.value, productOption.name)
                  }
                />
              );
            })}
            <ProductQuantity
              quantity={quantity}
              onChange={(val) => setQuantity(val)}
            />
            <ProductRelatedItems items={relatedProducts} />
          </div>
        </div>
        <div className="flex bg-base">
          <button
            className="w-full transition-colors rounded bg-light spaced-md text-dark hover:bg-primary font-gopher"
            onClick={() => {
              console.log(productItem?._id, productItem.name);
              addToCart(productItem?._id ?? "", quantity);
              setQuantity(1);
            }}
          >
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
}
