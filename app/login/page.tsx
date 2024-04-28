"use client";

import { ScrollingProducts } from "@/components/decorations/scrolling-products";
import { useProductsStore } from "@/state/products";
import { useUserStore } from "@/state/user";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function Page() {
  const router = useRouter();

  const { user, signIn } = useUserStore();
  const { products, getProducts } = useProductsStore();

  useEffect(() => {
    if (user) {
      router.push("/");
    }
  }, [user]);

  useEffect(() => {
    if (!products.length) {
      getProducts();
    }
  }, []);

  return (
    <div className="relative">
      <div className="absolute z-20 top-1/2 -translate-x-1/2 -translate-y-1/2 rounded left-1/2 w-[500px] h-[700px] spaced bg-light"></div>
      <div className="w-full h-full  overflow-hidden">
        <ScrollingProducts />
      </div>
    </div>
  );
}
