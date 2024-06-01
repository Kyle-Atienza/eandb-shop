"use client";

import gsap from "gsap";
// import { ScrollTrigger } from "gsap/all";
import { useGSAP } from "@gsap/react";
import { useRef } from "react";
import Link from "next/link";
import SplitType from "split-type";

gsap.registerPlugin(useGSAP);

export function Footer() {
  const container = useRef(null);
  const inner = useRef(null);
  //   const link = document.querySelector(".link");

  const { contextSafe } = useGSAP({ scope: container });

  return (
    <div ref={container} className="z-10 flex items-end">
      <div className="footer bg-dark h-[35vw] w-full flex flex-col spaced *:-mt-[1vw] *:text-[10vw] *:text-light *:font-ranille *:leading-[1em] *:w-fit">
        <Link className="hover:text-primary !mt-0" href={"/"}>
          <span className="link">Be A Reseller</span>
        </Link>
        <Link className="hover:text-primary " href={"/"}>
          Visit Us
        </Link>
        <Link className="hover:text-primary " href={"/"}>
          Contact Us
        </Link>
      </div>
    </div>
  );
}
