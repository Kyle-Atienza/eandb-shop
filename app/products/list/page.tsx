import { useEffect } from "react";
import axios from "axios";

import { ProductCard } from "@/components/products/card";
import { ProductFilter } from "@/components/products/filter";

import { useProductsStore } from "@/state/products";
import { list } from "postcss";

const getProductList = async () => {
  const res = await fetch(`${process.env.BASE_URL}/products/list`);
  return await res.json();
};

export default async function Page({ params }: { params: { filter: string } }) {
  const productList: ProductListingItem[] = await getProductList();

  return (
    <>
      <div className="flex flex-col gap-spaced mt-[5vh]">
        <div className="sticky top-[100px] flex justify-center z-20 spaced-t">
          <ProductFilter />
        </div>
        <div className="grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-spaced">
          {productList?.map((listingItem, index) => {
            return <ProductCard product={listingItem} key={index} />;
          })}
        </div>
      </div>
    </>
  );
}
