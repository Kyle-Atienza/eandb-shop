"use client";

import { Select } from "@/components/common/forms/select";
import { ProductsGrid } from "../../products/grid";
import { ChangeEvent, useEffect, useState } from "react";
import { useProductsStore } from "@/state/products";

const productFilters = [
  {
    value: "all",
    label: "All",
  },
  {
    value: "Oyster Mushroom",
    label: "Oyster Mushroom",
  },
  {
    value: "Banana",
    label: "Banana",
  },
  {
    value: "Taro",
    label: "Taro",
  },
];

export function Catalog() {
  const { getProductList, productList } = useProductsStore();
  const [filter, setFilter] = useState("all");

  useEffect(() => {
    if (!productList.length) {
      getProductList(filter);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    getProductList(filter);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [filter]);

  return (
    <div className="min-h-screen">
      <div className="sticky h-[70px] w-fit top-0 z-20 flex items-center">
        <Select
          className="w-[100px] md:w-[200px]"
          innerClassName="!bg-light"
          options={productFilters}
          value={filter}
          onChange={(e: ChangeEvent<HTMLSelectElement>) => {
            setFilter(e.target.value);
          }}
        />
      </div>
      <div className="spaced-t-sm">
        <ProductsGrid productList={productList} />
      </div>
    </div>
  );
}
