"use client";

import { Label } from "@/components/common/label";
import { ChangeEvent, useState } from "react";
import { ProductQuantity } from "../quantity";
import { useOrdersStore } from "@/state/orders";
import { HeaderOne } from "@/components/common/header";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

export function ProductSelect({ pageItem }: { pageItem: ProductPageItem }) {
  const { addToCart } = useOrdersStore();
  const pathname = usePathname();
  const router = useRouter();
  const searchParams = useSearchParams();

  const [quantity, setQuantity] = useState<number>(1);

  const selectedVariant = pageItem.variants.find((variant, index) =>
    searchParams.get("variant")
      ? variant.attribute._id === searchParams.get("variant")
      : index === 0
  );

  return (
    <>
      <div className="spaced lg:sticky top-[100px]">
        <div className="h-fit lg:h-screen flex flex-col">
          <div className="flex flex-col sm:flex-row justify-between spaced-b sm:spaced-none gap-spaced-sm">
            <div className="w-3/5 flex flex-col gap-spaced-md lg:spaced-b">
              <HeaderOne className="">{pageItem?.name}</HeaderOne>
            </div>
            <div className=" flex lg:flex-col gap-spaced-sm items-stretch lg:items-end">
              <div className="bg-light spaced-x-sm rounded-sm font-merchant flex items-center">
                <Label className="!text-3xl">
                  P{selectedVariant?.amount.toFixed(2)}
                </Label>
              </div>
              <div className="border-2 border-light spaced-x-sm rounded-sm font-merchant ">
                <Label className="!text-3xl text-light normal-case">
                  {pageItem?.netWeight}
                </Label>
              </div>
            </div>
          </div>
          <div className="spaced-y border-t-2 border-light text-light text-lg lg:text-2xl 2xl:text-3xl  font-gopher *:mb-3">
            {pageItem.description ? (
              <>
                {pageItem.description.split("\n").map((detail, index) => {
                  return <p key={index}>{detail}</p>;
                })}
              </>
            ) : null}
          </div>
          <div className="">
            <div className="flex flex-col sm:flex-row *:flex-1 items-stretch">
              {pageItem.variants.length > 1 ? (
                <div className="flex items-center *:w-full sm:border-r-2 spaced-y-sm border-t-2 border-light">
                  <select
                    name=""
                    id=""
                    defaultValue={
                      searchParams.get("variant") ||
                      pageItem.variants[0].attribute._id
                    }
                    onChange={(e: ChangeEvent<HTMLSelectElement>) => {
                      router.push(`${pathname}?variant=${e.target.value}`);
                    }}
                  >
                    {pageItem.variants.map((variant, index) => {
                      return (
                        <option value={variant.attribute._id} key={index}>
                          {variant.attribute.value}
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
                console.log(selectedVariant);
                if (selectedVariant) {
                  addToCart(selectedVariant._id, quantity);
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
