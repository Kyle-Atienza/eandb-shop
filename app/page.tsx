"use client";

import { useEffect } from "react";
import { useProductsStore } from "@/state/products";

import { BentoProducts } from "@/components/sections/bento-products";
import { ProductFilter } from "@/components/products/filter";

export default function Home() {
  const { getProducts } = useProductsStore();

  useEffect(() => {
    getProducts();
  }, []);

  return (
    <main className="">
      <ProductFilter />
      <div className="spaced-t">
        <BentoProducts />
      </div>
    </main>
  );
}
