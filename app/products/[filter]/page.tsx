"use client";

import { ProductCard } from "@/components/products/card";
import { ProductFilter } from "@/components/products/filter";

import { useProductsStore } from "@/state/products";
import { useEffect } from "react";

export default function Page({ params }: { params: { filter: string } }) {
  const { productList, getProductList } = useProductsStore();

  useEffect(() => {
    getProductList();
  }, []);

  return (
    <>
      <div className="flex flex-col gap-spaced mt-[5vh]">
        <div className="sticky top-[100px] flex justify-center z-20 spaced-t">
          <ProductFilter />
        </div>
        <div className="grid grid-cols-3 gap-spaced">
          {productList?.map((listingItem, index) => {
            /* const productData = {
              ...listingItem,
              _id: listingItem._id.toLowerCase().replaceAll(" ", "-"),
              name: listingItem._id,
              gallery: [],
            }; */
            const cardData = {
              ...listingItem,
              _id: listingItem._id.toLowerCase().replaceAll(" ", "-"),
            };
            // console.log(cardData);
            return <ProductCard product={cardData} key={index} index={index} />;
          })}
        </div>
      </div>
    </>
  );
}
