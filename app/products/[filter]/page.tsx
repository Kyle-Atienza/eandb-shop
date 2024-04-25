"use client";

import { useEffect } from "react";
import axios from "axios";

import { ProductCard } from "@/components/products/card";
import { ProductFilter } from "@/components/products/filter";

import { useProductsStore } from "@/state/products";

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
        <div className="grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-spaced">
          {productList?.map((listingItem, index) => {
            const cardData = {
              ...listingItem,
              _id: listingItem._id.toLowerCase().replaceAll(" ", "-"),
            };
            return <ProductCard product={cardData} key={index} index={index} />;
          })}
        </div>
      </div>
    </>
  );
}

/* export async function getStaticProps() {
  const res = await axios({
    method: "get",
    url: `${process.env.BASE_URL}/products`,
  });
  const productList = await res.data;

  return {
    props: {
      productList,
    },
  };
} */
