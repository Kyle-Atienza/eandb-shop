"use client";

import { Navbar } from "@/components";
import { useState } from "react";
import Link from "next/link";

export default function Home() {
  const [hoveredProduct, setHoveredProduct] = useState<any | null>(null);

  function productSpacing(position: number): string {
    let place = position % 3;

    if (place === 2) {
      return "translate-y-28";
    } else if (place === 0) {
      return `translate-y-14`;
    }
    return ``;
  }

  return (
    <main className="flex min-h-screen">
      <div className="sticky top-0 flex flex-col justify-between w-1/3 max-h-screen debug-border spaced-no-r">
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
      <div className="w-2/3 debug-border">
        <div className="grid grid-cols-3 gap-spaced spaced">
          {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14].map((el) => {
            return (
              <Link href={`/${el}`}>
                <div
                  className={`max-w-sm bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700 hover:bg-primary ${productSpacing(
                    el
                  )}`}
                  onMouseEnter={() => setHoveredProduct(el)}
                  onMouseLeave={() => setHoveredProduct(null)}
                >
                  <a href="#">
                    <img className="rounded-t-lg" src="/image-1.jpeg" alt="" />
                  </a>
                  <div className="p-5">
                    <a href="#">
                      <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
                        Noteworthy technology acquisitions 2021
                      </h5>
                    </a>
                  </div>
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </main>
  );
}
