"use client";

import React, { use, useEffect, useRef } from "react";
import { useOptionsStore } from "@/state/options";
import { useUserStore } from "@/state/user";
import { useOrdersStore } from "@/state/orders";

import { useRouter, usePathname } from "next/navigation";

import { FakeBorderRadius } from "@/components/decorations/fake-border-radius";
import { AnimatedCursor } from "@/components/template/animated-cursor";

import Cart from "@/components/cart";

import gsap from "gsap";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(useGSAP);

export default function Template({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const pathname = usePathname();

  const { drawer, toggleDrawer, closeDrawer } = useOptionsStore();
  const { user, signOut } = useUserStore();
  const { cart, getCart, resetOrdersStore } = useOrdersStore();

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
    <div className="flex flex-col">
      <AnimatedCursor />
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
