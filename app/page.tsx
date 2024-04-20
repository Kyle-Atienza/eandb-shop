"use client";

import { Navbar } from "@/components";
import Image from "next/image";

import { useEffect, useState, useRef } from "react";
import { useRouter } from "next/navigation";
import { useProductCardHoveredStore } from "@/state/animation";
import { useProductsStore } from "@/state/products";

import { ProductCard } from "@/components/products/card";

import gsap from "gsap";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(useGSAP);

export default function Home() {
  const [hoveredProduct, setHoveredProduct] = useState<Product | null>(null);

  const router = useRouter();

  const { setValues } = useProductCardHoveredStore();
  const { products, getProducts } = useProductsStore();

  const mainCard = useRef(null);
  const marqueeCard = useRef(null);

  function onHoverProduct(e: any, product: Product) {
    // for page transition animation
    const { top, left, width, height } = e.target.getBoundingClientRect();
    setValues(top, left, width, height);

    setHoveredProduct(product);
  }

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

  useEffect(() => {
    getProducts();
  }, []);

  return (
    <main className="">
      <div className="grid grid-cols-2 gap-spaced lg:grid-cols-3 spaced-b">
        <div
          ref={mainCard}
          className="flex flex-col relative justify-end col-span-2 z-10 text-[8vw] font-ranille text-light"
        >
          <p>Welcome! Discover what's in store for you!</p>
          <div className="w-[12vw] aspect-square bg-light rounded-full absolute -bottom-[35%] -right-[15%]"></div>
        </div>

        {products.slice(0, 3).map((product, index) => {
          return (
            <ProductCard
              product={product}
              index={index}
              key={index}
              colSpanItems={[2]}
            />
          );
        })}

        <div
          ref={marqueeCard}
          className="lg:col-span-3 h-[11vw] flex items-center overflow-hidden relative"
        >
          <div id="marquee" className="absolute flex gap-[2vw]">
            <p className="marquee__part text-[10vw] font-ranille text-light whitespace-nowrap translate-y-[0.05em]">
              Organic, Fresh, and Local Produce!
            </p>
            <p className="marquee__part text-[10vw] font-ranille text-light whitespace-nowrap translate-y-[0.05em]">
              Organic, Fresh, and Local Produce!
            </p>
          </div>
        </div>

        {products.slice(4, 10).map((product, index) => {
          return (
            <ProductCard
              product={product}
              index={index}
              key={index}
              rowSpanItems={[5]}
              colSpanItems={[4]}
            />
          );
        })}

        <div className="flex flex-col relative row-span-2 z-10 text-[2.5vw] font-gopher ">
          <div className="w-[12vw] aspect-square bg-light rounded-full absolute -top-[35%] -left-[15%]"></div>

          <div className="sticky top-[50vh] spaced text-dark bg-primary rounded items-center justify-between flex">
            <div className="flex flex-col gap-4">
              <p>Want to be our reseller?</p>
              <p className="uppercase text-[1vw] tracking-widest">
                Check our wholesale rates!
              </p>
            </div>
            <i className="bi bi-shop-window"></i>
          </div>
        </div>

        {products.slice(11).map((product, index) => {
          return <ProductCard product={product} index={index} key={index} />;
        })}
      </div>
    </main>
  );
}
