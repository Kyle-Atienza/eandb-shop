"use client";

import React, { use, useEffect } from "react";
import { useProductCardHoveredStore } from "@/state/animation";
import { useOptionsStore } from "@/state/options";
import { useRouter } from "next/navigation";

export default function Template({ children }: { children: React.ReactNode }) {
  const router = useRouter();

  const { top, left, width, height } = useProductCardHoveredStore();
  const { cart, toggleCart, closeCart } = useOptionsStore();

  useEffect(() => {
    const productHover = document.getElementById("productHover");
    if (productHover) {
      productHover.style.top = `${top}px`;
      productHover.style.left = `${left}px`;
      productHover.style.width = `${width}px`;
      productHover.style.height = `${height}px`;
    }
  }, [top, left, width, height]);

  useEffect(() => {
    console.log("page change", cart);
    if (cart) {
      closeCart();
    }
  }, [router]);

  return (
    <div>
      {/* <div
        id="productHover"
        className={`fixed border-2 pointer-events-none border-primary z-50`}
      ></div> */}
      <div>
        <div>
          <button className="self-start p-2 bg-dark text-light">Login</button>
        </div>
        <div>
          <button
            className="self-start p-2 bg-dark text-light"
            onClick={() => toggleCart()}
          >
            Cart
          </button>
          <button className="self-start p-2 bg-dark text-light">Logout</button>
        </div>
      </div>
      <div
        className={`cart-drawer fixed min-h-screen w-[300px] bg-light right-0 transition-all spaced ${
          cart ? "" : "translate-x-full"
        }`}
      >
        Your Cart
      </div>
      {children}
    </div>
  );
}
