import { useEffect } from "react";
import axios from "axios";

import { ProductCard } from "@/components/products/card";
import { ProductFilter } from "@/components/products/filter";

import { useProductsStore } from "@/state/products";

const getProductList = async () => {
  const res = await axios.get(`${process.env.BASE_URL}/products/list`);
  return await res.data;
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
            const cardData = {
              ...listingItem,
              _id: listingItem._id.toLowerCase().replaceAll(" ", "-"),
            };
            return <ProductCard product={cardData} key={index} />;
          })}
        </div>
      </div>
    </>
  );
}
