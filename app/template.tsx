"use client";

import React, { use, useEffect, useRef } from "react";
import { useProductCardHoveredStore } from "@/state/animation";
import { useOptionsStore } from "@/state/options";
import { useUserStore } from "@/state/user";
import { useOrdersStore } from "@/state/orders";

import { useRouter, usePathname } from "next/navigation";

import { FakeBorderRadius } from "@/components/decorations/fake-border-radius";

import Cart from "@/components/cart";
import PickMeSvg from "@/public/svg";

import gsap from "gsap";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(useGSAP);

export default function Template({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const pathname = usePathname();

  const { drawer, toggleDrawer, closeDrawer } = useOptionsStore();
  const { user, signOut } = useUserStore();
  const { cart, getCart, resetOrdersStore } = useOrdersStore();

  const container = useRef(null);
  const hoverCursorContainer = useRef(null);
  const hoverCursor = useRef(null);
  const hoverCursorSolid = useRef(null);
  const pickMe = useRef(null);

  useGSAP(
    () => {
      const mouseAnimation = (e: MouseEvent) => {
        const { target, x, y } = e;
        const onProductCard = (target as HTMLElement).closest(
          ".product-card .hover-trigger"
        );
        const productCardRect = onProductCard?.getBoundingClientRect();

        gsap.to(hoverCursorContainer.current, {
          x: onProductCard
            ? (productCardRect?.left || 0) + (productCardRect?.width || 0) / 2
            : x,
          y: onProductCard
            ? (productCardRect?.top || 0) + (productCardRect?.height || 0) / 2
            : y,
          duration: onProductCard ? 1 : 0.7,
          ease: "power4",
        });

        gsap.to(hoverCursor.current, {
          scale: onProductCard ? 1 : 0.1,
          ease: "power4",
        });

        gsap.to(hoverCursorSolid.current, {
          opacity: onProductCard ? 0 : 100,
          ease: "power4",
        });

        gsap.to(pickMe.current, {
          scale: onProductCard ? 1 : 0,
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

      gsap.to(pickMe.current, {
        rotation: 360,
        duration: 8,
        repeat: -1,
        ease: "linear",
      });

      return () => {
        window.removeEventListener("mousemove", mouseAnimation);
        window.removeEventListener("scroll", hideHoverOnScroll);
      };
    },
    { scope: container }
  );

  useEffect(() => {
    if (drawer) {
      closeDrawer();
    }
  }, [router]);

  useEffect(() => {
    if (user) {
      getCart();
    }
  }, []);

  return (
    <div ref={container} className="flex flex-col">
      <div className="fixed top-0 left-0 z-20 w-screen h-screen pointer-events-none ">
        <div ref={hoverCursorContainer}>
          <div
            ref={hoverCursor}
            className="w-[32vw] scale-0 aspect-square border-2 overflow-hidden border-light border-solid rounded-full absolute z-10 -translate-x-1/2 -translate-y-1/2 flex items-center justify-center"
          >
            <div
              ref={hoverCursorSolid}
              className="w-full h-full bg-light"
            ></div>
          </div>
        </div>
      </div>
      <div className="sticky top-0 z-50 spaced-x bg-base">
        <div className="relative spaced-y">
          {user ? (
            <div className="flex gap-spaced">
              {pathname !== "/checkout" ? (
                <button
                  className="text-3xl text-light"
                  onClick={() => toggleDrawer()}
                >
                  <i className="bi bi-bag"></i>
                </button>
              ) : null}
              <button
                onClick={() => {
                  signOut();
                  resetOrdersStore();
                  router.push("/");
                }}
                className="text-3xl text-light"
              >
                <i className="bi bi-box-arrow-right"></i>
              </button>
            </div>
          ) : (
            <div>
              <button
                onClick={() => router.push("/login")}
                className="self-start p-2 bg-dark text-light"
              >
                Login
              </button>
            </div>
          )}
          <FakeBorderRadius position="topLeft" className="top-full" />
          <FakeBorderRadius position="topRight" className="right-0 top-full" />
        </div>
      </div>
      <div
        className={`drawer fixed min-h-screen max-h-screen flex flex-col w-[500px] bg-light right-0 transition-all spaced ${
          drawer ? "" : "translate-x-full"
        }`}
      >
        {pathname !== "/checkout" ? (
          <div>
            <div className="flex justify-between">
              <div>Your Cart</div>
              <button
                onClick={() => router.push("/checkout")}
                className="self-start p-2 bg-dark text-light"
              >
                Checkout
              </button>
            </div>
            <Cart />
          </div>
        ) : null}
      </div>
      <div className="spaced-x">{children}</div>
    </div>
  );
}
