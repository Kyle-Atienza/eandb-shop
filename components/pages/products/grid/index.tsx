"use client";

import { useEffect, useMemo, useRef, useState } from "react";

import { ProductCard } from "@/components/products/card";

import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { mapListingOptionsToItems } from "@/utils/products";
import { sliceArrayEveryN } from "@/utils/array";
gsap.registerPlugin(useGSAP, ScrollTrigger);

export function ProductsGrid({
  productListingOptions,
}: {
  productListingOptions: ProductListingOptions[];
}) {
  const container = useRef<HTMLDivElement>(null);
  const [slice, setSlice] = useState<number>(0);
  const productListingItems = useMemo(
    () => mapListingOptionsToItems(productListingOptions),
    [productListingOptions]
  );

  const getSlice = () => {
    setSlice(
      Array.from(document.querySelectorAll(".col")).filter((element) => {
        const computedStyle = window.getComputedStyle(element);
        return computedStyle.display !== "none";
      }).length
    );
  };

  useEffect(() => {
    getSlice();
    window.addEventListener("resize", getSlice);

    return () => {
      window.removeEventListener("resize", getSlice);
    };
  }, []);

  const animateColumn = (column: string, yOffset: number | string) => {
    gsap.to(column, {
      marginTop: yOffset,
      ease: "none",
      scrollTrigger: {
        trigger: column,
        start: "top bottom",
        end: "bottom bottom",
        scrub: 1.2,
        markers: true,
      },
    });
  };

  useGSAP(
    () => {
      gsap.fromTo(
        ".products",
        {
          yPercent: 15,
        },
        {
          ease: "expo.out",
          duration: 1,
          yPercent: 0,
        }
      );

      animateColumn(".col-1", "-56vw");
      animateColumn(".col-2", "-10vw");
      animateColumn(".col-3", "-25vw");
      animateColumn(".col-4", "-40vw");
    },
    { scope: container, dependencies: [slice], revertOnUpdate: true }
  );

  const renderProducts = (startIndex: number) => {
    return sliceArrayEveryN(productListingItems, slice, startIndex)?.map(
      (listingItem, index) => {
        return <ProductCard product={listingItem} key={index} />;
      }
    );
  };

  return (
    <div ref={container}>
      <div className="products flex gap-spaced relative mt-[8vw] spaced-b">
        <div className="flex flex-col flex-1 col col-1 gap-spaced h-min -mt-[18vw]">
          {slice ? renderProducts(0) : null}
        </div>
        <div className="flex flex-col flex-1 col col-2 gap-spaced h-min">
          {slice ? renderProducts(1) : null}
        </div>
        <div className="flex-col flex-1 hidden col col-3 md:flex gap-spaced h-min -mt-[4vw]">
          {slice ? renderProducts(2) : null}
        </div>
        <div className="flex-col flex-1 hidden col col-4 xl:flex gap-spaced h-min -mt-[12vw]">
          {slice ? renderProducts(3) : null}
        </div>
      </div>
    </div>
  );
}
