"use client";

import { ProductCard } from "@/components/products/card";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/all";
import { useRef } from "react";

gsap.registerPlugin(ScrollTrigger);

export function ProductRelatedItems({
  items,
}: {
  items: ProductListingItem[];
}) {
  const container = useRef(null);
  const card1 = useRef(null);
  const card2 = useRef(null);
  const card3 = useRef(null);
  const card4 = useRef(null);

  const animateCard = (className: string, startX: number, startY: number) => {
    gsap.set(className, {
      yPercent: startY,
      xPercent: startX,
    });
    gsap.to(className, {
      yPercent: 0,
      xPercent: 0,
      duration: 1.2,
      ease: "power3.inOut",
      scrollTrigger: {
        trigger: ".recommended",
        markers: true,
        start: "top 80%",
      },
    });
  };

  useGSAP(
    () => {
      /* animateCard(".card-1", -15, 100);
      animateCard(".card-2", 8, 100);
      animateCard(".card-3", -12, 100);
      animateCard(".card-4", 18, 100); */
    },
    { scope: container }
  );

  const marqueeContainer = useRef(null);

  useGSAP(
    () => {
      gsap.to(".marquee-item", {
        xPercent: 100,
        repeat: -1,
        duration: 4,
        ease: "linear",
      });
    },
    { scope: marqueeContainer }
  );

  return (
    <>
      <div
        ref={container}
        className=" flex flex-col gap-spaced border-light mb-24"
      >
        <div
          ref={marqueeContainer}
          className="bg-light spaced-y-sm border-y-2 border-tertiary w-screen"
        >
          <div className="flex justify-center uppercase font-gopher overflow-hidden tracking-[0.3em]">
            <div className="marquee-item flex gap-spaced-sm spaced-r-sm">
              <div className="whitespace-nowrap">Try Some of this </div>
              <i className="bi bi-arrow-down" />
            </div>
            <div className="marquee-item flex gap-spaced-sm spaced-r-sm">
              <div className="whitespace-nowrap">Try Some of this </div>
              <i className="bi bi-arrow-down" />
            </div>
            <div className="marquee-item flex gap-spaced-sm spaced-r-sm">
              <div className="whitespace-nowrap">Try Some of this </div>
              <i className="bi bi-arrow-down" />
            </div>
            <div className="marquee-item flex gap-spaced-sm spaced-r-sm">
              <div className="whitespace-nowrap">Try Some of this </div>
              <i className="bi bi-arrow-down" />
            </div>
            <div className="marquee-item flex gap-spaced-sm spaced-r-sm">
              <div className="whitespace-nowrap">Try Some of this </div>
              <i className="bi bi-arrow-down" />
            </div>
            <div className="marquee-item flex gap-spaced-sm spaced-r-sm">
              <div className="whitespace-nowrap">Try Some of this </div>
              <i className="bi bi-arrow-down" />
            </div>
            <div className="marquee-item flex gap-spaced-sm spaced-r-sm">
              <div className="whitespace-nowrap">Try Some of this </div>
              <i className="bi bi-arrow-down" />
            </div>
            <div className="marquee-item flex gap-spaced-sm spaced-r-sm">
              <div className="whitespace-nowrap">Try Some of this </div>
              <i className="bi bi-arrow-down" />
            </div>
            <div className="marquee-item flex gap-spaced-sm spaced-r-sm">
              <div className="whitespace-nowrap">Try Some of this </div>
              <i className="bi bi-arrow-down" />
            </div>
            <div className="marquee-item flex gap-spaced-sm spaced-r-sm">
              <div className="whitespace-nowrap">Try Some of this </div>
              <i className="bi bi-arrow-down" />
            </div>
            <div className="marquee-item flex gap-spaced-sm spaced-r-sm">
              <div className="whitespace-nowrap">Try Some of this </div>
              <i className="bi bi-arrow-down" />
            </div>
            <div className="marquee-item flex gap-spaced-sm spaced-r-sm">
              <div className="whitespace-nowrap">Try Some of this </div>
              <i className="bi bi-arrow-down" />
            </div>
            <div className="marquee-item flex gap-spaced-sm spaced-r-sm">
              <div className="whitespace-nowrap">Try Some of this </div>
              <i className="bi bi-arrow-down" />
            </div>
            <div className="marquee-item flex gap-spaced-sm spaced-r-sm">
              <div className="whitespace-nowrap">Try Some of this </div>
              <i className="bi bi-arrow-down" />
            </div>
            <div className="marquee-item flex gap-spaced-sm spaced-r-sm">
              <div className="whitespace-nowrap">Try Some of this </div>
              <i className="bi bi-arrow-down" />
            </div>
          </div>
        </div>
        <div className="recommended spaced grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-spaced">
          {/* <div className="card-1">
            <div className="rotate-3 translate-y-12">
              <ProductCard product={items[0]} />
            </div>
          </div>
          <div className="card-2">
            <div className="-rotate-2 translate-y-32">
              <ProductCard product={items[1]} />
            </div>
          </div>
          <div className="card-3">
            <div className="rotate-6">
              <ProductCard product={items[2]} />
            </div>
          </div>
          <div className="card-4">
            <div className="rotate-3 translate-y-20">
              <ProductCard product={items[3]} />
            </div>
          </div> */}
          <div>
            <ProductCard product={items[0]} />
          </div>
          <div>
            <ProductCard product={items[1]} />
          </div>
          <div>
            <ProductCard product={items[2]} />
          </div>
          <div>
            <ProductCard product={items[3]} />
          </div>
        </div>
      </div>
    </>
  );
}
