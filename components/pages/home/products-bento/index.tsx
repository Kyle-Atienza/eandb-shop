"use client";

import { Label } from "@/components/common/label";
import { ProductBentoCard } from "@/components/products/bento-card";
import { BentoLogin } from "./login";

import { useProductsStore } from "@/state/products";
import { useRef } from "react";
import { useRouter, redirect } from "next/navigation";

import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/all";
import { useUserStore } from "@/state/user";

gsap.registerPlugin(useGSAP);
gsap.registerPlugin(ScrollTrigger);

function Main() {
  const scrollDown = useRef(null);

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
    <div className="main-card relative flex flex-col justify-end col-span-1 gap-spaced lg:col-span-2 xl:col-span-3 font-ranille text-light">
      <Label>Welcome!</Label>
      <div className=" text-[10vw] lg:text-[7vw] leading-[1em]">
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
      </div>
    </div>
  );
}

function Marquee() {
  const marqueeCard = useRef(null);

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

  return (
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
  );
}

function Reseller() {
  return (
    <div className="relative z-10 flex flex-col min-h-[100vw] lg:min-h-0 row-span-2 lg:row-span-2 font-gopher">
      <div className="sticky bottom-0 mt-auto spaced-b">
        <div className="spaced text-dark bg-light rounded lg:items-center items-start lg:justify-between flex flex-col lg:flex-row gap-4 hover:bg-primary transition-colors">
          <div className="flex flex-col gap-4 ">
            <p className="text-2xl lg:text-3xl">Want to be our reseller?</p>
            <Label>Check our wholesale rates!</Label>
          </div>
          <i className="text-4xl lg:text-3xl bi bi-shop-window"></i>
        </div>
      </div>
    </div>
  );
}

function User() {
  const { user } = useUserStore();

  return (
    <div className="col-span-2 relative flex flex-col justify-end">
      <div id="login" className="-top-[25vh] absolute" />
      {!user ? <BentoLogin /> : null}
    </div>
  );
}

export function BentoHome() {
  const router = useRouter();

  const { products } = useProductsStore();

  return (
    <div className="grid grid-cols-2 gap-spaced lg:grid-cols-3 xl:grid-cols-4 spaced-b">
      <Main />

      <ProductBentoCard className="row-span-2" product={products[0]} />

      <ProductBentoCard product={products[1]} />

      <ProductBentoCard product={products[2]} />

      <ProductBentoCard product={products[3]} />

      <Marquee />

      <ProductBentoCard className="col-span-2" product={products[4]} />

      <ProductBentoCard product={products[5]} />

      <ProductBentoCard product={products[6]} />

      <Reseller />

      <ProductBentoCard product={products[7]} />

      <User />

      <ProductBentoCard product={products[8]} />
    </div>
  );
}
