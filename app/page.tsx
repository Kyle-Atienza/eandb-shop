"use client";

import { Navbar } from "@/components";
import Image from "next/image";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useProductCardHoveredStore } from "@/state/animation";
import { useProductsStore } from "@/state/products";

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
          {products.map((product, index) => {
            return (
              <div
                key={index}
                className={`overflow-hidden transition-all bg-white border rounded shadow border-dark dark:bg-gray-800 dark:border-gray-700 bg-dark`}
                onMouseEnter={(e) => onHoverProduct(e, product)}
                onMouseLeave={() => setHoveredProduct(null)}
                onClick={() => router.push(`/product/${product._id}`)}
              >
                <Image
                  className={`transition-all ${
                    hoveredProduct?._id !== product._id &&
                    hoveredProduct !== null
                      ? "opacity-50"
                      : ""
                  }`}
                  src="https://res.cloudinary.com/dfdw1yzkk/image/upload/v1712994720/E%20and%20B%20Farm/products/images/square/af8k4pwotuc9p9nlb6aa.png"
                  alt=""
                  width={500}
                  height={500}
                  objectFit="contain"
                />
                {product.name}
              </div>
            );
          })}
        </div>
      </div>
    </main>
  );
}
