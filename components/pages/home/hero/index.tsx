"use client";

import Image from "next/image";

import circleText from "@/public/made-in-mindoro.svg";
import circleTextv2 from "@/public/made-in-mindoro-V2.svg";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { useRef } from "react";
import { ScrollTrigger } from "gsap/all";
gsap.registerPlugin(useGSAP, ScrollTrigger);

export function Hero() {
  const container = useRef(null);

  useGSAP(
    () => {
      gsap.to(".circle-text", {
        rotate: -360,
        repeat: -1,
        ease: "none",
        duration: 14,
      });
    },
    { scope: container }
  );

  return (
    <div ref={container} className="sticky h-[40vw] bg-secondary">
      <div className="spaced h-full flex items-end">
        {/* <div className="w-4/5">
        </div> */}
        <h1 className="*:whitespace-pre-line w-fit relative text-tertiary text-[12vw] font-ranille flex flex-col *:-mt-5">
          <span>Explore</span>
          <span>organic and</span>
          <span>local goodness!</span>
        </h1>
      </div>
      <div className="w-[15vw] aspect-square absolute bottom-0 translate-y-2/3 right-[25vw] mix-blend-difference border-light rounded-full">
        <Image
          className="circle-text "
          src={circleTextv2}
          fill
          objectFit="contain"
          alt="circle text"
        />
      </div>
    </div>
  );
}
