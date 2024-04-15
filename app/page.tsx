"use client";

import { Navbar } from "@/components";
import { useEffect, useState } from "react";
import Image from "next/image";

import { useProductCardHoveredStore } from "@/state/animation";
import { useProductsStore } from "@/state/products";

export default function Home() {
  const { setValues } = useProductCardHoveredStore();
  const { products, getProducts } = useProductsStore();

  const [hoveredProduct, setHoveredProduct] = useState<Product | null>(null);

  function onHoverProduct(e: any, product: Product) {
    const { top, left, width, height } = e.target.getBoundingClientRect();
    setValues(top, left, width, height);

    setHoveredProduct(product);
  }

  useEffect(() => {
    getProducts();
  }, []);

  return (
    <main className="flex min-h-screen">
      <div className="sticky top-0 flex flex-col justify-between w-1/3 max-h-screen spaced-no-r">
        <div>
          <Navbar />
        </div>
        <div>
          <h1>
            {hoveredProduct?.name}
            {/* {hoveredProduct?.name
              ? `Discover the bounty of our organic, freshly sourced, locally
              produced products!`
              : ""} */}
          </h1>
        </div>
      </div>
      <div className="w-2/3 overflow-hidden border-2 border-solid border-dark bg-dark">
        <div className="grid grid-cols-3">
          {products.map((el, elIndex) => {
            return (
              <div
                key={elIndex}
                className={`overflow-hidden transition-all bg-white border rounded shadow border-dark dark:bg-gray-800 dark:border-gray-700 bg-dark`}
                onMouseEnter={(e) => onHoverProduct(e, el)}
                onMouseLeave={() => setHoveredProduct(null)}
              >
                <Image
                  className={`transition-all ${
                    hoveredProduct?._id !== el._id && hoveredProduct !== null
                      ? "opacity-50"
                      : ""
                  }`}
                  src="https://res.cloudinary.com/dfdw1yzkk/image/upload/v1712994720/E%20and%20B%20Farm/products/images/square/af8k4pwotuc9p9nlb6aa.png"
                  alt=""
                  width={500}
                  height={500}
                  objectFit="contain"
                />
                {el.name}
              </div>
            );
          })}
        </div>
      </div>
    </main>
  );
}
