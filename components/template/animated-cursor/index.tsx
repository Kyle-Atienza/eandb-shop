import { useEffect, useRef } from "react";

import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { useAnimationStore } from "@/state/animation";
import { cursorPageOut, customCursorAnimation } from "./animations";

gsap.registerPlugin(useGSAP);

export function AnimatedCursor() {
  const { pageOutHref, animatePageOut, redirect, isPageLoading } =
    useAnimationStore();

  const container = useRef(null);
  const hoverCursor = useRef(null);
  const hoverCursorInner = useRef(null);
  const hoverCursorContainer = useRef(null);
  const hoverCursorBg = useRef(null);

  useGSAP(
    () => {
      const hideHoverOnScroll = () => {
        gsap.to(hoverCursor.current, {
          scale: 0,
          duration: 0.7,
          ease: "power4",
        });
      };

      window.addEventListener("scroll", hideHoverOnScroll);
      window.addEventListener("mousemove", (e: MouseEvent) =>
        customCursorAnimation(e, hoverCursorContainer, hoverCursor)
      );

      return () => {
        window.removeEventListener("scroll", hideHoverOnScroll);
        window.removeEventListener("mousemove", (e: MouseEvent) =>
          customCursorAnimation(e, hoverCursorContainer, hoverCursor)
        );
      };
    },
    { scope: container }
  );

  useGSAP(
    () => {
      cursorPageOut(
        hoverCursorInner,
        hoverCursorBg,
        pageOutHref,
        isPageLoading,
        redirect
      );
    },
    {
      scope: container,
      dependencies: [pageOutHref],
    }
  );

  return (
    <div
      ref={container}
      className="fixed top-0 left-0 z-50 w-screen h-screen pointer-events-none"
    >
      <div ref={hoverCursorContainer} className="">
        <div
          ref={hoverCursor}
          className="w-[2vw] h-[2vw] absolute z-10 flex items-center justify-center "
        >
          <div
            ref={hoverCursorInner}
            className="absolute w-full h-full -translate-x-1/2 -translate-y-1/2 border-2 border-solid rounded-[100%] overflow-hidden border-light top-1/2 left-1/2"
          >
            <div
              ref={hoverCursorBg}
              className="w-full h-full opacity-20 bg-tertiary "
            />
          </div>
        </div>
      </div>
    </div>
  );
}
