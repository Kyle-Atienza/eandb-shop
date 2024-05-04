import gsap from "gsap";
import { AppRouterInstance } from "next/dist/shared/lib/app-router-context.shared-runtime";

export const animatePageIn = () => {
  const main = document.getElementById("main");

  if (main) {
    const tl = gsap.timeline();

    tl.set(main, {
      opacity: 0,
    }).to(main, {
      opacity: 1,
      duration: 1,
    });
  }
};

export const animatePageOut = (href: string, router: AppRouterInstance) => {
  const cursor = document.getElementById("cursor");

  if (cursor) {
    const tl = gsap.timeline();

    tl.set(cursor, {}).to(cursor, {
      scale: 3,
      onComplete: () => {
        router.push(href);
      },
    });
  }
};
