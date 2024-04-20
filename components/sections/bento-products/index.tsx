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
    <div className="grid grid-cols-2 gap-2 lg:grid-cols-4 spaced-b mt-2">
      <div
        ref={mainCard}
        className="relative z-10 flex flex-col justify-end col-span-3 font-ranille text-light spaced-y"
      >
        <Label>Welcome</Label>
        <p className="mt-[2vw] text-[7vw]">Discover what's in store for you!</p>
        <div className="w-[9vw] aspect-square bg-light rounded-full absolute -bottom-[26%] -right-[8%]"></div>
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
        className="relative flex items-center overflow-hidden lg:col-span-4 spaced-y"
      >
        <div id="marquee" className=" flex gap-[2vw] text-[7vw]">
          <p className="marquee__part  font-ranille text-light whitespace-nowrap translate-y-[0.05em]">
            Organic, Fresh, and Local Produce!
          </p>
          <p className="marquee__part font-ranille text-light whitespace-nowrap translate-y-[0.05em]">
            Organic, Fresh, and Local Produce!
          </p>
        </div>
      </div>

      {products.slice(5, 10).map((product, index) => {
        return (
          <ProductCard
            product={product}
            index={index}
            key={index}
            colSpanItems={[0]}
          />
        );
      })}

      <div className="relative z-10 flex flex-col row-span-2 text-3xl font-gopher ">
        <div className="w-[9vw] aspect-square bg-light rounded-full absolute -top-[35%] -left-[15%]"></div>

        <div className="sticky top-[50vh] spaced text-dark bg-light rounded items-center justify-between flex gap-4 hover:bg-primary transition-colors">
          <div className="flex flex-col gap-4">
            <p>Want to be our reseller?</p>
            <Label>Check our wholesale rates!</Label>
          </div>
          <i className="bi bi-shop-window"></i>
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
