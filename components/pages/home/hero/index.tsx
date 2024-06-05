"use client";

import Image from "next/image";

import circleText from "@/public/made-in-mindoro.svg";
import circleTextv2 from "@/public/made-in-mindoro-V2.svg";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { useRef } from "react";
import { ScrollTrigger } from "gsap/all";
import SplitType from "split-type";

gsap.registerPlugin(useGSAP, ScrollTrigger);

export function Hero() {
  const container = useRef(null);
  const heroText = useRef(null);

  useGSAP(
    () => {
      const splitHeroText = new SplitType(".hero-text");

      gsap.set(splitHeroText.lines, { overflow: "hidden" });

      gsap.fromTo(
        splitHeroText.chars,
        {
          yPercent: 100,
        },
        {
          yPercent: 0,
          stagger: 0.05,
          onComplete: () => {
            splitHeroText.revert();
          },
        }
      );

      gsap.to(".circle-text", {
        rotate: -360,
        repeat: -1,
        ease: "none",
        duration: 14,
      });

      gsap.to(".marquee-text", {
        xPercent: 100,
        ease: "linear",
        duration: 8,
        repeat: -1,
      });
    },
    { scope: container }
  );

  return (
    <div ref={container} className="relative lg:h-[40vw] bg-secondary">
      {/* <div className="marquee h-[100px] bg-dark flex items-center-0 items-center w-screen overflow-hidden">
        <div className="flex absolute justify-end w-screen overflow-hidden">
          {Array.from(Array(15).keys()).map((key) => {
            return (
              <p
                key={key}
                className="marquee-text font-merchant text-light text-3xl uppercase tracking-widest spaced-r-md whitespace-nowrap"
              >
                Healthy, Flavorful, Family-Made Treats!
              </p>
            );
          })}
        </div>
      </div> */}
      <div className="h-screen bg-light"></div>
    </div>
  );
}

/* 
<div ref={container} className="relative lg:h-[40vw] bg-secondary">
      <div className="absolute top-0 left-0 w-full h-full">
      </div>
      <div className="spaced h-full flex items-end">
        <h1
          ref={heroText}
          className="hero-text *:whitespace-pre-line w-fit relative text-tertiary text-[12vw] font-ranille flex flex-col *:-mt-[1vw]"
        >
          <span>Explore</span>
          <span>organic and</span>
          <span>local goodness!</span>
        </h1>
      </div>
      <div className="marquee h-[100px] bg-dark flex items-center-0 items-center w-screen overflow-hidden">
        <div className="flex absolute justify-end w-screen overflow-hidden">
          {Array.from(Array(15).keys()).map((key) => {
            return (
              <p
                key={key}
                className="marquee-text font-merchant text-light text-3xl uppercase tracking-widest spaced-r-md whitespace-nowrap"
              >
                Healthy, Flavorful, Family-Made Treats!
              </p>
            );
          })}
        </div>
      </div>
    </div>
*/
