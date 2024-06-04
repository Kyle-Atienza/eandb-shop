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
      <div className="absolute top-0 left-0 w-full h-full">
        {/* <video width="320" height="240" controls preload="none">
      <source src="/path/to/video.mp4" type="video/mp4" />
      <track
        src="/path/to/captions.vtt"
        kind="subtitles"
        srcLang="en"
        label="English"
      />
      Your browser does not support the video tag.
    </video> */}
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
      {/* <div className="w-[40vw] lg:w-[15vw] aspect-square absolute top-0 lg:top-[unset] lg:bottom-0 -translate-y-1/3 lg:translate-y-2/3 left-0 lg:left-[unset] -translate-x-1/3 lg:translate-x-0 lg:right-[25vw] mix-blend-difference border-light rounded-full">
        <Image
          className="circle-text "
          src={circleTextv2}
          fill
          objectFit="contain"
          alt="circle text"
        />
      </div> */}
      <div className="marquee h-[70px] bg-dark flex items-center-0 items-center w-screen overflow-hidden">
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
  );
}
