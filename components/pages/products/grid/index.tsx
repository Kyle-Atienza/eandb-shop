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

  const productListItemsOptions = productList.reduce(
    (items: ProductListingItemOption[], productListItem) => {
      let productListItemOptions: ProductListingItemOption[] = [];
      productListItem.options.forEach((option) => {
        productListItemOptions.push({
          ...option,
          _id: productListItem._id,
          details: productListItem.details,
        });
      });
      return items.concat(productListItemOptions);
    },
    []
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

  const animateColumn = (column: string, yOffset: number) => {
    gsap.to(column, {
      yPercent: yOffset,
      ease: "none",
      scrollTrigger: {
        trigger: column,
        start: "top bottom",
        end: "bottom bottom",
        scrub: 0.8,
        markers: true,
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
    { scope: container, dependencies: [productList] }
  );

  const renderProducts = (startIndex: number) => {
    return sliceArrayEveryN(productListItemsOptions, slice, startIndex)?.map(
      (listingItem, index) => {
        return <ProductCard product={listingItem} key={index} />;
      }
    );
  };

  return (
    <div className="flex gap-spaced relative" ref={container}>
      <div className="flex flex-col flex-1 col col-1 gap-spaced h-min">
        {slice ? renderProducts(0) : null}
      </div>
      <div className="flex flex-col flex-1 col col-2 gap-spaced h-min">
        {slice ? renderProducts(1) : null}
      </div>
      <div className="flex-col flex-1 hidden col col-3 md:flex gap-spaced h-min">
        {slice ? renderProducts(2) : null}
      </div>
      <div className="flex-col flex-1 hidden col col-4 xl:flex gap-spaced h-min">
        {slice ? renderProducts(3) : null}
      </div>
    </div>
  );
}
