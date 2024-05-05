"use client";

import { useEffect } from "react";
import { useProductsStore } from "@/state/products";

import { BentoHome } from "@/components/pages/home/products-bento";
import { ProductFilter } from "@/components/products/filter";
import axios from "axios";

/* const getProducts = async () => {
  const res = await axios.get(`${process.env.BASE_URL}/products`);
  return await res.data;
}; */

export default function Home() {
  // const products: Product[] = await getProducts();
  const { getProducts } = useProductsStore();

  useEffect(() => {
    getProducts();
  }, []);

  return (
    <div className="">
      <div className="h-[30vh] relative">
        {/* <div className="absolute rotate-12 bg-light rounded bottom-0 right-[10vw] aspect-[3/4] w-[20vw]" />
        <div className="absolute -rotate-6 bg-light rounded top-0 left-0 aspect-[5/3] w-[35vw]" /> */}
      </div>
      <ProductFilter />
      <div className="spaced-t">
        <BentoHome />
      </div>
    </div>
  );
}
