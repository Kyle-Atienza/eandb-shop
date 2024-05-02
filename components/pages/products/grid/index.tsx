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
  const container = useRef(null);
  const [slice, setSlice] = useState<number>(0);

  const getSlice = () => {
    if (window.matchMedia("(min-width: 1280px)").matches) {
      setSlice(4);
    } else if (window.matchMedia("(min-width: 1024px)").matches) {
      setSlice(3);
    } else {
      setSlice(2);
    }
  };

  useEffect(() => {
    getSlice();

    window.addEventListener("resize", getSlice);

    return () => {
      window.removeEventListener("resize", getSlice);
    };
  }, []);

  useGSAP(
    () => {
      gsap.to(".col-1", {
        yPercent: -5,
        ease: "none",
        scrollTrigger: {
          trigger: ".col-1",
          start: "top bottom",
          end: "bottom top",
          scrub: true,
        },
      });

      gsap.to(".col-2", {
        yPercent: -40,
        ease: "none",
        scrollTrigger: {
          trigger: ".col-2",
          start: "top bottom",
          end: "bottom top",
          scrub: true,
        },
      });

      gsap.to(".col-3", {
        yPercent: -20,
        ease: "none",
        scrollTrigger: {
          trigger: ".col-3",
          start: "top bottom",
          end: "bottom top",
          scrub: true,
        },
      });

      gsap.to(".col-4", {
        yPercent: 5,
        ease: "none",
        scrollTrigger: {
          trigger: ".col-4",
          start: "top bottom",
          end: "bottom top",
          scrub: true,
        },
      });
    },
    { scope: container }
  );

  return (
    <div ref={container}>
      <div className="flex gap-spaced">
        <div className="col-1 flex flex-col gap-spaced flex-1 h-min">
          {slice
            ? sliceArrayEveryN(productList, slice, 1)?.map(
                (listingItem, index) => {
                  return <ProductCard product={listingItem} key={index} />;
                }
              )
            : null}
        </div>
        <div className="col-2  flex flex-col gap-spaced flex-1 translate-y-[20vh] h-min">
          {slice
            ? sliceArrayEveryN(productList, slice, 2)?.map(
                (listingItem, index) => {
                  return <ProductCard product={listingItem} key={index} />;
                }
              )
            : null}
        </div>
        <div className="col-3 hidden md:flex flex-col gap-spaced flex-1 translate-y-[10vh] h-min">
          {slice
            ? sliceArrayEveryN(productList, slice, 3)?.map(
                (listingItem, index) => {
                  return <ProductCard product={listingItem} key={index} />;
                }
              )
            : null}
        </div>
        <div className="col-4 hidden xl:flex flex-col gap-spaced flex-1 translate-y-[-5vh] h-min">
          {slice
            ? sliceArrayEveryN(productList, slice, 4)?.map(
                (listingItem, index) => {
                  return <ProductCard product={listingItem} key={index} />;
                }
              )
            : null}
        </div>
      </div>
    </div>
  );
}
