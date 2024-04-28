"use client";

import { ProductBentoCard } from "@/components/products/bento-card";
import { useProductsStore } from "@/state/products";

import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { useRef } from "react";
gsap.registerPlugin(useGSAP);

function ProductCards() {
  const { products } = useProductsStore();
  return (
    <>
      {products.map((product, index) => {
        return (
          <div
            key={index}
            className="h-[30vh] w-[30vh] flex-shrink-0 opacity-50 hover:opacity-100 hover:blur-none transition-all duration-700"
          >
            <ProductBentoCard product={product} key={index} />
          </div>
        );
      })}
    </>
  );
}

function ProductsRow({ even }: { even?: boolean }) {
  const container = useRef(null);

  /* useGSAP(
    () => {
      gsap.to(".marquee-cards", {
        xPercent: even ? -100 : 100,
        repeat: -1,
        duration: 60,
        ease: "none",
      });
    },
    { scope: container }
  ); */

  return (
    <div
      ref={container}
      className={`flex  gap-spaced transition-opacity ${
        even ? "-translate-x-[20vh]" : "translate-x-[20vh] justify-end"
      }`}
    >
      <div className={`flex ${even ? "" : "justify-end"}`}>
        <div className="marquee-cards flex gap-spaced spaced-r">
          <ProductCards />
        </div>
        <div className="marquee-cards flex gap-spaced spaced-r">
          <ProductCards />
        </div>
      </div>
    </div>
  );
}

export function ScrollingProducts() {
  return (
    <div className=" gap-spaced w-full h-full overflow-hidden relative">
      <div className="absolute w-full h-full flex flex-col gap-spaced">
        {[1, 2, 3].map((row) => {
          return <ProductsRow key={row} even={row % 2 === 0} />;
        })}
      </div>
    </div>
  );
}
