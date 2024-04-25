"use client";

import { ProductCard } from "@/components/products/card";
import { useProductsStore } from "@/state/products";
import { useEffect } from "react";

export default function Page() {
  const { productList, getProductList } = useProductsStore();

  useEffect(() => {
    getProductList();
  }, []);

  return (
    <div className="grid grid-cols-3 gap-spaced">
      {productList?.map((listingItem, index) => {
        const productData = {
          _id: listingItem._id.toLowerCase().replaceAll(" ", "-"),
          name: listingItem._id,
          gallery: [],
        };
        return <ProductCard product={productData} key={index} index={index} />;
      })}
    </div>
  );
}
