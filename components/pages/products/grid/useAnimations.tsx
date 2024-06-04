import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { useRef } from "react";

export function useAnimations(slice: number) {
  const container = useRef<HTMLDivElement>(null);

  const animateColumn = (column: string, yOffset: number | string) => {
    gsap.to(column, {
      marginTop: yOffset,
      ease: "none",
      scrollTrigger: {
        trigger: column,
        start: "top bottom",
        end: "bottom bottom",
        scrub: 1.2,
        // markers: true,
      },
    });
  };

  useGSAP(
    () => {
      gsap.fromTo(
        ".products",
        {
          y: "100vh",
        },
        {
          ease: "expo.out",
          duration: 1.5,
          y: 0,
          delay: 0.8,
        }
      );

      animateColumn(".col-1", "-56vw");
      animateColumn(".col-2", "-10vw");
      animateColumn(".col-3", "-25vw");
      animateColumn(".col-4", "-40vw");
    },
    { scope: container, dependencies: [slice], revertOnUpdate: true }
  );

  return { container };
}
