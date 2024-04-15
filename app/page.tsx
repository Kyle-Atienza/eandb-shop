"use client";

import { Navbar } from "@/components";
import { useState } from "react";
import Link from "next/link";
import Image from "next/image";

import { useProductCardHoveredStore } from "@/state/animation";

export default function Home() {
  const { setValues } = useProductCardHoveredStore();

  const [hoveredProduct, setHoveredProduct] = useState<any | null>(null);

  function productSpacing(position: number): string {
    let place = position % 3;

    if (place === 2) {
      return "translate-y-36";
    } else if (place === 0) {
      return `translate-y-16`;
    }
    return ``;
  }

  function onHoverProduct(e: any, val: any) {
    console.log(e.target.getBoundingClientRect());
    const { top, left, width, height } = e.target.getBoundingClientRect();
    setValues(top, left, width, height);

    setHoveredProduct(val);
  }

  return (
    <main className="flex min-h-screen">
      <div className="sticky top-0 flex flex-col justify-between w-1/3 max-h-screen spaced-no-r">
        <div>
          <Navbar />
        </div>
        <div>
          <h1>
            {hoveredProduct ??
              `Discover the bounty of our organic, freshly sourced, locally
              produced products!`}
          </h1>
        </div>
      </div>
      <div className="w-2/3 overflow-hidden border-2 border-solid border-dark bg-dark">
        <div className="grid grid-cols-3">
          {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14].map((el) => {
            return (
              <div
                key={el}
                className={`overflow-hidden transition-all bg-white border rounded shadow border-dark dark:bg-gray-800 dark:border-gray-700 bg-dark ${
                  el === 2 || el === 10 ? "row-span-2 col-span-2" : ""
                }`}
                onMouseEnter={(e) => onHoverProduct(e, el)}
                onMouseLeave={() => setHoveredProduct(null)}
              >
                <Image
                  className={`transition-all ${
                    hoveredProduct && hoveredProduct !== el ? "opacity-50" : ""
                  }`}
                  src="https://res.cloudinary.com/dfdw1yzkk/image/upload/v1712994720/E%20and%20B%20Farm/products/images/square/af8k4pwotuc9p9nlb6aa.png"
                  alt=""
                  width={1080}
                  height={1080}
                  objectFit="contain"
                />
              </div>
            );
          })}
        </div>
      </div>
    </main>
  );
}
