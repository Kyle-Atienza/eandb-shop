import { useAnimationStore } from "@/state/animation";
import { ReactRef } from "@gsap/react";
import gsap from "gsap";

export const cursorPageOut = (
  hoverCursorInner: ReactRef,
  hoverCursorBg: ReactRef,
  pageOutHref: string,
  isPageLoading: boolean,
  redirect: () => void
) => {
  const redirectCursorTl = gsap.timeline();

  if (pageOutHref) {
    redirectCursorTl
      .to(
        hoverCursorInner.current,
        {
          width: "300vw",
          height: "300vw",
          ease: "expo.inOut",
          duration: 0.8,
          onComplete: () => {
            redirect();
          },
        },
        "start"
      )
      .to(
        hoverCursorBg.current,
        {
          opacity: 1,
        },
        "start"
      );
  }

  if (!isPageLoading && !pageOutHref) {
    redirectCursorTl
      .to(hoverCursorInner.current, {
        opacity: 0,
      })
      .to(hoverCursorInner.current, {
        width: "100%",
        height: "100%",
      })
      .to(hoverCursorInner.current, {
        opacity: 1,
      })
      .to(hoverCursorBg.current, {
        opacity: 0,
      });
  }
};

export const customCursorAnimation = (
  e: MouseEvent,
  hoverCursorContainer: ReactRef,
  hoverCursor: ReactRef
) => {
  const { target, x, y } = e;
  const onProductCard = (target as HTMLElement).closest(".product-card");
  const productCardRect = onProductCard?.getBoundingClientRect();

  if (hoverCursorContainer.current) {
    gsap.to(hoverCursorContainer.current, {
      x: onProductCard
        ? (productCardRect?.left || 0) + (productCardRect?.width || 0) / 2
        : x,
      y: onProductCard
        ? (productCardRect?.top || 0) + (productCardRect?.height || 0) / 2
        : y,
      duration: onProductCard ? 1 : 0.7,
      opacity: 1,
      ease: "power4",
    });
  }

  if (hoverCursor?.current) {
    gsap.to(hoverCursor.current, {
      width: onProductCard
        ? productCardRect?.width! + productCardRect?.width! * 0.15
        : 20,
      height: onProductCard
        ? productCardRect?.height! + productCardRect?.height! * 0.15
        : 20,
      xPercent: -50,
      yPercent: -50,
      scale: 1,
      ease: "power4",
    });
  }
};
