"use client";

import { Navbar } from "@/components";
import Image from "next/image";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useProductCardHoveredStore } from "@/state/animation";
import { useProductsStore } from "@/state/products";

import { ProductCard } from "@/components/products/card";

export default function Home() {
  const [hoveredProduct, setHoveredProduct] = useState<Product | null>(null);

  const router = useRouter();

  const { setValues } = useProductCardHoveredStore();
  const { products, getProducts } = useProductsStore();

  function onHoverProduct(e: any, product: Product) {
    // for page transition animation
    const { top, left, width, height } = e.target.getBoundingClientRect();
    setValues(top, left, width, height);

    setHoveredProduct(product);
  }

  useEffect(() => {
    getProducts();
  }, []);

  return (
    <main className="">
      <div className="grid gap-spaced grid-cols-2 lg:grid-cols-3">
        <div className="col-span-2 min-h-[400px] flex flex-col justify-end rounded overflow-hidden relative">
          <div className="absolute">
            {/* <p className="text-[10vw] font-ranille text-light whitespace-nowrap translate-y-[0.4em]">
              Shop Organic, Fresh, and Local Produce!
            </p> */}
          </div>
        </div>

        {products.slice(0, 4).map((product, index) => {
          return (
            <ProductCard
              product={product}
              index={index}
              key={index}
              rowSpanItems={[1]}
            />
          );
        })}

        <div className="lg:col-span-2 h-[200px] flex flex-col justify-end rounded overflow-hidden relative">
          <div className="absolute"></div>
        </div>

        {products.slice(5, 11).map((product, index) => {
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

        <div className=" h-[200px] flex flex-col justify-end rounded overflow-hidden relative">
          <div className="absolute">
            {/* <p className="text-[10vw] font-ranille text-light whitespace-nowrap translate-y-[0.4em]">
              Shop Organic, Fresh, and Local Produce!
            </p> */}
          </div>
        </div>

        {products.slice(12).map((product, index) => {
          return <ProductCard product={product} index={index} key={index} />;
        })}
      </div>
    </main>
  );
}
