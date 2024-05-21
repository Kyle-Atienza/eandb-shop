"use client";

import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { useRef } from "react";
gsap.registerPlugin(useGSAP);

export function ScrollDown() {
  const container = useRef(null);

  useGSAP(
    () => {
      gsap.to(".arrow-down", {
        yPercent: 100,
        repeat: -1,
        duration: 1.2,
        ease: "none",
      });
    },
    { scope: container }
  );

  return (
    <span ref={container} className="relative group">
      <span className="opacity-0">M</span>
      <div className="absolute top-1/2 w-4/5 overflow-hidden transition-colors -translate-x-1/2 -translate-y-1/2 rounded-full bg-dark group-hover:bg-primary aspect-square left-1/2">
        <div className="absolute flex flex-col items-center justify-center w-full h-full">
          <i className="arrow-down text-[0.6em] text-light bi bi-arrow-down"></i>
          <i className="arrow-down text-[0.6em] text-light bi bi-arrow-down"></i>
          <i className="arrow-down text-[0.6em] text-light bi bi-arrow-down"></i>
        </div>
      </div>
    </span>
  );
}
