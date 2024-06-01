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
    <div ref={container} className="relative h-[40vw] bg-secondary">
      <div className="spaced h-full flex items-end">
        {/* <div className="w-4/5">
        </div> */}
        <h1
          ref={heroText}
          className="hero-text *:whitespace-pre-line w-fit relative text-tertiary text-[12vw] font-ranille flex flex-col *:-mt-5"
        >
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
      <div className="marquee h-[70px] bg-dark flex items-center-0 items-center">
        <div className="flex absolute justify-end w-screen">
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
  );
}
