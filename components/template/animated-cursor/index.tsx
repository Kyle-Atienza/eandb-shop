import { useRef } from "react";

import gsap from "gsap";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(useGSAP);

export function AnimatedCursor() {
  const container = useRef(null);
  const hoverCursor = useRef(null);
  const hoverCursorSolid = useRef(null);
  const hoverCursorContainer = useRef(null);

  useGSAP(
    () => {
      const mouseAnimation = (e: MouseEvent) => {
        const { target, x, y } = e;
        const onProductCard = (target as HTMLElement).closest(
          ".product-card .hover-trigger"
        );
        const productCardRect = onProductCard?.getBoundingClientRect();

        gsap.to(hoverCursorContainer.current, {
          x: onProductCard ? productCardRect?.left : x,
          y: onProductCard ? productCardRect?.top : y,
          duration: onProductCard ? 1 : 0.7,
          ease: "power4",
        });

        gsap.to(hoverCursor.current, {
          // scale: onProductCard ? 1 : 0.1,
          width: onProductCard ? productCardRect?.width : 20,
          height: onProductCard ? productCardRect?.height : 20,
          scale: 1,
          ease: "power4",
        });

        gsap.to(hoverCursorSolid.current, {
          opacity: onProductCard ? 0 : 0.2,
          ease: "power4",
        });
      };
      const hideHoverOnScroll = () => {
        gsap.to(hoverCursor.current, {
          scale: 0,
          duration: 0.7,
          ease: "power4",
        });
      };

      window.addEventListener("mousemove", mouseAnimation);
      window.addEventListener("scroll", hideHoverOnScroll);

      return () => {
        window.removeEventListener("mousemove", mouseAnimation);
        window.removeEventListener("scroll", hideHoverOnScroll);
      };
    },
    { scope: container }
  );

  return (
    <div
      ref={container}
      className="fixed top-0 left-0 z-20 w-screen h-screen pointer-events-none "
    >
      <div ref={hoverCursorContainer} className="">
        <div
          ref={hoverCursor}
          className="w-[2vw] aspect-square border-2 overflow-hidden border-light border-solid rounded-[100%] absolute z-10 -translate-x-1/2 -translate-y-1/2 flex items-center justify-center"
        >
          <div
            ref={hoverCursorSolid}
            className="w-full h-full opacity-20 bg-light"
          ></div>
        </div>
      </div>
    </div>
  );
}
