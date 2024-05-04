"use client";

import { useEffect, useRef, useState } from "react";

import { ProductCard } from "@/components/products/card";

import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
gsap.registerPlugin(useGSAP);
gsap.registerPlugin(ScrollTrigger);

const sliceArrayEveryN = (arr: any[], n: number, startIndex: number) => {
  let result = [];
  for (var i = startIndex; i < arr.length; i += n) {
    result.push(arr[i]);
  }
  return result;
};

export function ProductsGrid({
  productList,
}: {
  productList: ProductListingItem[];
}) {
  const container = useRef<HTMLDivElement>(null);
  const [slice, setSlice] = useState<number>(0);

  const getSlice = () => {
    setSlice(document.querySelectorAll(".col").length);
  };

  useEffect(() => {
    getSlice();
    window.addEventListener("resize", getSlice);
    return () => {
      window.removeEventListener("resize", getSlice);
    };
  }, []);

  const animateColumn = (column: string, yOffset: number) => {
    gsap.to(column, {
      yPercent: yOffset,
      ease: "none",
      scrollTrigger: {
        trigger: column,
        start: "top top",
        end: "bottom bottom",
        scrub: 0.8,
      },
    });
  };

  useGSAP(
    () => {
      animateColumn(".col-1", -10);
      animateColumn(".col-2", -25);
      animateColumn(".col-3", -5);
      animateColumn(".col-4", 10);
    },
    { scope: container, dependencies: [slice] }
  );

  const renderProducts = (startIndex: number) => {
    return sliceArrayEveryN(productList, slice, startIndex)?.map(
      (listingItem, index) => {
        return <ProductCard product={listingItem} key={index} />;
      }
    );
  };

  return (
    <div className="flex gap-spaced" ref={container}>
      <div className="col col-1 flex flex-col gap-spaced flex-1 h-min">
        {slice ? renderProducts(1) : null}
      </div>
      <div className="col col-2 flex flex-col gap-spaced flex-1 h-min">
        {slice ? renderProducts(2) : null}
      </div>
      <div className="col col-3 hidden md:flex flex-col gap-spaced flex-1 h-min">
        {slice ? renderProducts(3) : null}
      </div>
      <div className="col col-4 hidden xl:flex flex-col gap-spaced flex-1 h-min">
        {slice ? renderProducts(4) : null}
      </div>
    </div>
  );
}
