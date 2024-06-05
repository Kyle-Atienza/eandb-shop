"use client";

import { TransitionLink } from "@/components/common/transition-link";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import Link from "next/link";
import { useRef } from "react";
gsap.registerPlugin(useGSAP);

export function BackButton() {
  const container = useRef(null);

  useGSAP(
    () => {
      gsap.to(".bi-arrow-left", {
        xPercent: -100,
        repeat: -1,
        duration: 1.2,
        ease: "none",
      });
    },
    { scope: container }
  );

  return (
    <div ref={container} className="">
      <div className="sticky top-[100px]">
        <TransitionLink
          href="/"
          className=" w-14 aspect-square bg-tertiary rounded-full flex items-center justify-center text-3xl text-light hover:bg-primary transition-colors *:spaced-r-sm overflow-hidden border-2 border-light"
        >
          <i className={`bi bi-arrow-left `}></i>
          <i className={`bi bi-arrow-left `}></i>
          <i className={`bi bi-arrow-left `}></i>
        </TransitionLink>
      </div>
    </div>
  );
}
