import { Label } from "@/components/common/label";
import { ProductCard } from "@/components/products/card";

import { useProductsStore } from "@/state/products";
import { useRef } from "react";

import gsap from "gsap";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(useGSAP);

export function BentoProducts() {
  const { products } = useProductsStore();

  const mainCard = useRef(null);
  const marqueeCard = useRef(null);

  useGSAP(
    () => {
      gsap.to(".marquee__part", {
        xPercent: -100,
        repeat: -1,
        duration: 18,
        ease: "linear",
      });
    },
    { scope: marqueeCard }
  );

  return (
    <div className="grid grid-cols-2 gap-spaced lg:grid-cols-3 xl:grid-cols-4 spaced-b">
      <div
        ref={mainCard}
        className="relative z-10 flex flex-col justify-end col-span-1 lg:col-span-2 xl:col-span-3 font-ranille text-light"
      >
        <Label>Welcome!</Label>
        <p className="mt-[2vw] text-[10vw] lg:text-[7vw]">
          Discover what's in store for you!
        </p>
        <div className="w-[20vw] lg:w-[9vw] aspect-square bg-light rounded-full absolute -bottom-[26%] -right-[8%]"></div>
      </div>

      {products.slice(0, 4).map((product, index) => {
        return (
          <ProductCard
            product={product}
            index={index}
            key={index}
            rowSpanItems={[0]}
          />
        );
      })}

      <div
        ref={marqueeCard}
        className="relative flex flex-col col-span-2 xl:col-span-4 spaced-y"
      >
        <div
          id="marquee"
          className=" sticky top-[30vh] flex gap-[2vw] text-[10vw] lg:text-[7vw] overflow-hidden"
        >
          <p className="marquee__part  font-ranille text-light whitespace-nowrap translate-y-[0.05em]">
            Organic, Fresh, and Local Produce!
          </p>
          <p className="marquee__part font-ranille text-light whitespace-nowrap translate-y-[0.05em]">
            Organic, Fresh, and Local Produce!
          </p>
        </div>
      </div>

      {/* workaround for responsive params */}
      {products.slice(5, 10).map((product, index) => {
        return (
          <ProductCard
            product={product}
            index={index}
            key={index}
            colSpanItems={[0]}
            className="hidden lg:block"
          />
        );
      })}
      {products.slice(5, 10).map((product, index) => {
        return (
          <ProductCard
            product={product}
            index={index}
            key={index}
            className="lg:hidden"
          />
        );
      })}

      <div className="relative z-10 flex flex-col min-h-[100vw] lg:min-h-0 row-span-2 lg:row-span-2 font-gopher ">
        <div className="w-[20vw] lg:w-[9vw] aspect-square bg-light rounded-full absolute -top-[35%] -left-[15%]"></div>

        <div className="sticky top-[50vh] spaced text-dark bg-light rounded lg:items-center items-start lg:justify-between flex flex-col lg:flex-row gap-4 hover:bg-primary transition-colors">
          <div className="flex flex-col gap-4">
            <p className="text-2xl lg:text-3xl">Want to be our reseller?</p>
            <Label>Check our wholesale rates!</Label>
          </div>
          <i className="text-4xl lg:text-3xl bi bi-shop-window"></i>
        </div>
      </div>

      {products.slice(11).map((product, index) => {
        return (
          <ProductCard
            product={product}
            index={index}
            key={index}
            rowSpanItems={[0]}
          />
        );
      })}
    </div>
  );
}
