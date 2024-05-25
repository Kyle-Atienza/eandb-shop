"use client";

import { Select } from "@/components/common/forms/select";
import { HeaderOne } from "@/components/common/header";
import {
  InlineScrollDown,
  ScrollDown,
} from "@/components/decorations/scroll-down";
import { Catalog } from "@/components/pages/home/catalog";
import { useProduct } from "@/hooks/useProduct";
import { useProductsStore } from "@/state/products";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/all";
import { useRef } from "react";

gsap.registerPlugin(useGSAP);
gsap.registerPlugin(ScrollTrigger);

export default function Home() {
  const { productList } = useProductsStore();

  const container = useRef(null);

  useGSAP(
    () => {
      gsap.to(".hero", {
        filter: "blur(10px)",
        opacity: 0.3,
        scrollTrigger: {
          trigger: ".hero",
          start: "center 0%",
          end: "bottom 0%",
          scrub: 2,
        },
      });

      /* gsap.to(".floaties-1", {
        yPercent: -50,
        scrollTrigger: {
          trigger: ".floaties-1",
          start: "center center",
          end: "center 0%",
          markers: true,
          scrub: 3,
        },
      }); */

      if (productList.length) {
        gsap.set(".catalog", {
          yPercent: 10,
        });
        gsap.to(".catalog", {
          yPercent: 0,
        });
      }
    },
    { scope: container, dependencies: [productList] }
  );

  return (
    <>
      <div ref={container} className="mt-[-40px] sticky top-[160px]">
        <div className="hero flex flex-col items-center justify-center h-[65vh] text-center ">
          <div className="flex flex-col items-center gap-spaced-md *:!text-light relative">
            <HeaderOne className="text-center *:whitespace-pre-line w-fit relative">
              <span className="md:hidden">
                Discover
                {"\n"}a world
                {"\n"}
                of organic and
                {"\n"}
                local goodness!
                {"\n"}
                <InlineScrollDown />
              </span>
              <span className="hidden md:block">
                Discover a world{"\n"}
                of organic and local
                {"\n"}
                goodness!
                <InlineScrollDown />
              </span>
            </HeaderOne>
            <div className="font-gopher w-full lg:w-2/5 text-lg lg:text-2xl relative !leading-[1em]">
              Explore a curated selection of fresh, organic, and locally sourced
              products. From farm-fresh fruits and vegetables to artisanal
              goods, experience the best nature has to offer right at your
              doorstep.
            </div>
          </div>
        </div>
      </div>
      <div className="catalog spaced-x spaced-t">
        <Catalog />
      </div>
    </>
  );
}
