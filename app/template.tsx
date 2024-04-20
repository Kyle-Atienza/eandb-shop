"use client";

import React, { use, useEffect, useRef } from "react";
import { useOptionsStore } from "@/state/options";
import { useUserStore } from "@/state/user";
import { useOrdersStore } from "@/state/orders";

import { useRouter, usePathname } from "next/navigation";

import { AnimatedCursor } from "@/components/template/animated-cursor";
import { Navbar } from "@/components/template/navbar";

import Cart from "@/components/cart";

import gsap from "gsap";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(useGSAP);

export default function Template({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const pathname = usePathname();

  const { drawer, closeDrawer } = useOptionsStore();
  const { user } = useUserStore();
  const { getCart } = useOrdersStore();

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
      <Navbar />
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
