"use client";

import { Select } from "@/components/common/forms/select";
import { ProductsGrid } from "../../products/grid";
import { ChangeEvent, useEffect, useState } from "react";
import { useProductsStore } from "@/state/products";
import { usePathname, useRouter } from "next/navigation";

const productFilters = [
  {
    value: "all",
    label: "All",
  },
  {
    value: "oyster-mushroom",
    label: "Oyster Mushroom",
  },
  {
    value: "banana",
    label: "Banana",
  },
  {
    value: "taro",
    label: "Taro",
  },
];

export function Catalog({
  productOptions,
  filter,
}: {
  productOptions: ProductOption[];
  filter?: string;
}) {
  const pathname = usePathname();
  const router = useRouter();

  return (
    <div className="min-h-screen">
      <div className="sticky h-[70px] w-fit top-0 z-20 flex items-center">
        <Select
          className="w-[100px] md:w-[200px]"
          innerClassName="!bg-secondary border-light border-2"
          options={productFilters}
          value={filter}
          onChange={(e: ChangeEvent<HTMLSelectElement>) => {
            console.log(e.target.value);
            if (e.target.value !== "all") {
              router.push(`${pathname}?products=${e.target.value}`, {
                scroll: false,
              });
            } else {
              router.push("/");
            }
          }}
        />
      </div>
      <div className="spaced-t">
        <ProductsGrid productOptions={productOptions} />
      </div>
    </div>
  );
}
