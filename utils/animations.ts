import gsap from "gsap";
import { AppRouterInstance } from "next/dist/shared/lib/app-router-context.shared-runtime";

export const animateProductClickPageOut = (
  href: String,
  router: AppRouterInstance
) => {};

export const animatePageIn = () => {
  const main = document.getElementById("main");

  console.log(main);

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
