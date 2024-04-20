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
      <div className="grid grid-cols-2 gap-spaced lg:grid-cols-4 spaced-b mt-[25vh]">
        <div
          ref={mainCard}
          className="flex flex-col relative justify-end col-span-3 z-10 text-[7vw] font-ranille text-light"
        >
          <p className="whitespace-pre-line">
            Welcome!
            {"\n"}
            Discover what's in store for you!
          </p>
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
          className="relative flex items-center overflow-hidden lg:col-span-4"
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
          <div className="w-[12vw] aspect-square bg-light rounded-full absolute -top-[35%] -left-[15%]"></div>

          <div className="sticky top-[50vh] spaced text-dark bg-primary rounded items-center justify-between flex gap-4">
            <div className="flex flex-col gap-4">
              <p>Want to be our reseller?</p>
              <p className="text-sm tracking-widest uppercase">
                Check our wholesale rates!
              </p>
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
    </main>
  );
}
