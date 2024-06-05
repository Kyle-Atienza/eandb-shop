"use client";

import { useAnimationStore } from "@/state/animation";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { usePathname } from "next/navigation";
import { useEffect, useRef } from "react";

gsap.registerPlugin(useGSAP);

export function Preloader() {
  const container = useRef(null);

  const pathname = usePathname();

  const { preloading, setPreloading } = useAnimationStore();

  useEffect(() => {
    if (pathname === "/") {
      setPreloading(true);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useGSAP(
    () => {
      if (!preloading) {
        gsap.to(".preloader", {
          yPercent: -100,
          ease: "power1.inOut",
          duration: 1,
          delay: 1,
        });
      }
    },
    { scope: container, dependencies: [preloading] }
  );

  return (
    <>
      <div
        ref={container}
        className="fixed w-screen h-screen top-0 left-0 pointer-events-none z-50"
      >
        {/* {pathname === "/" ? (
          <div className="preloader bg-tertiary absolute top-0 left-0 w-full h-full grid place-content-center text-7xl text-light font-ranille">
          </div>
        ) : null} */}
        <div className="preloader bg-tertiary absolute top-0 left-0 w-full h-full grid place-content-center text-7xl text-light font-ranille"></div>
      </div>
    </>
  );
}
