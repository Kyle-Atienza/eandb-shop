import { Label } from "@/components/common/label";
import { ProductCard } from "@/components/products/card";
import { AsteriskSvg } from "@/components/decorations/svg/asterisk";

import { useProductsStore } from "@/state/products";
import { useRef } from "react";
import { useRouter, redirect } from "next/navigation";

import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/all";
gsap.registerPlugin(useGSAP);
gsap.registerPlugin(ScrollTrigger);

function BentoItem({ className }: { className?: string }) {
  return (
    <div
      className={`rounded bg-light ${className ? className : "aspect-square"}`}
    ></div>
  );
}

export function BentoProducts() {
  const router = useRouter();

  const { products } = useProductsStore();

  const mainCard = useRef(null);
  const container = useRef(null);
  const marqueeCard = useRef(null);
  const scrollDown = useRef(null);

  useGSAP(
    () => {
      gsap.to(".marquee__part", {
        xPercent: -100,
        repeat: -1,
        duration: 18,
        ease: "linear",
      });
    },
    { scope: marqueeCard }
  );

  useGSAP(
    () => {
      gsap.to(".arrow-down", {
        yPercent: 100,
        repeat: -1,
        duration: 1.2,
        ease: "none",
      });
    },
    { scope: scrollDown }
  );

  return (
    <div
      ref={container}
      className="grid grid-cols-2 gap-spaced lg:grid-cols-3 xl:grid-cols-4 spaced-b"
    >
      <div
        ref={mainCard}
        className="main-card relative z-30 flex flex-col justify-end col-span-1 gap-spaced lg:col-span-2 xl:col-span-3 font-ranille text-light"
      >
        <Label>Welcome!</Label>
        <p className=" text-[10vw] lg:text-[7vw]">
          {"Discover what's in store for you!"}
          <span ref={scrollDown} className="relative group">
            <span className="opacity-0">M</span>
            <div className="absolute top-0 w-4/5 overflow-hidden transition-colors -translate-x-1/2 rounded-full bg-dark group-hover:bg-primary aspect-square left-1/2">
              <div className="absolute flex flex-col items-center justify-center w-full h-full">
                <i className="arrow-down text-[5vw] text-light bi bi-arrow-down"></i>
                <i className="arrow-down text-[5vw] text-light bi bi-arrow-down"></i>
                <i className="arrow-down text-[5vw] text-light bi bi-arrow-down"></i>
              </div>
            </div>
          </span>
        </p>
      </div>

      <BentoItem className="row-span-2" />
      <BentoItem />
      <BentoItem />
      <BentoItem />

      <div
        ref={marqueeCard}
        className="relative flex flex-col col-span-2 xl:col-span-4 spaced-y"
      >
        <div
          id="marquee"
          className=" sticky top-[30vh] flex gap-[2vw] text-[10vw] lg:text-[7vw] overflow-hidden"
        >
          <p className="marquee__part  font-ranille text-light whitespace-nowrap translate-y-[0.05em]">
            Organic, Fresh, and Local Produce!
          </p>
          <p className="marquee__part font-ranille text-light whitespace-nowrap translate-y-[0.05em]">
            Organic, Fresh, and Local Produce!
          </p>
        </div>
      </div>

      <BentoItem className="col-span-2" />
      <BentoItem />
      <BentoItem />
      <BentoItem />
      <BentoItem />

      <div className="relative z-10 flex flex-col min-h-[100vw] lg:min-h-0 row-span-2 lg:row-span-2 font-gopher ">
        <div className="sticky top-[50vh] spaced text-dark bg-light rounded lg:items-center items-start lg:justify-between flex flex-col lg:flex-row gap-4 hover:bg-primary transition-colors">
          <div className="flex flex-col gap-4">
            <p className="text-2xl lg:text-3xl">Want to be our reseller?</p>
            <Label>Check our wholesale rates!</Label>
          </div>
          <i className="text-4xl lg:text-3xl bi bi-shop-window"></i>
        </div>
      </div>

      <BentoItem />
      <BentoItem />
      <BentoItem />
    </div>
  );
}
