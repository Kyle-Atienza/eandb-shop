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
    <div className="mt-[50vh]">
      <ProductFilter />
      <div className="spaced-t">
        <BentoHome />
      </div>
    </div>
  );
}
