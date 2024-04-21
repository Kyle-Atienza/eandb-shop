"use client";

import { useEffect } from "react";
import { useProductsStore } from "@/state/products";

import { LabelButton } from "@/components/common/button";
import { BentoProducts } from "@/components/sections/bento-products";

import gsap from "gsap";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(useGSAP);

export default function Home() {
  const { getProducts } = useProductsStore();

  useEffect(() => {
    getProducts();
  }, []);

  return (
    <main className="">
      <div className=" mt-[25vh] flex flex-wrap gap-spaced-md">
        <LabelButton>Oyster Mushroom</LabelButton>
        <LabelButton>Banana</LabelButton>
        <LabelButton>Taro</LabelButton>
        <LabelButton>All</LabelButton>
      </div>
      <div className="spaced-t">
        <BentoProducts />
      </div>
    </main>
  );
}
