"use client";

import React, { use, useEffect } from "react";
import { useProductCardHoveredStore } from "@/state/animation";
import { useOptionsStore } from "@/state/options";
import { useUserStore } from "@/state/user";
import { useOrdersStore } from "@/state/orders";

import { useRouter } from "next/navigation";

import Cart from "@/components/cart";

export default function Template({ children }: { children: React.ReactNode }) {
  const router = useRouter();

  const { top, left, width, height } = useProductCardHoveredStore();
  const { drawer, toggleDrawer, closeDrawer } = useOptionsStore();
  const { user, signOut } = useUserStore();
  const { cart, getCart, resetOrdersStore } = useOrdersStore();

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
    <div>
      {/* <div
        id="productHover"
        className={`fixed border-2 pointer-events-none border-primary z-50`}
      ></div> */}
      Name: {user?.name}
      <div>
        {user ? (
          <div>
            <button
              className="self-start p-2 bg-dark text-light"
              onClick={() => toggleDrawer()}
            >
              Cart
            </button>
            <button
              onClick={() => {
                signOut();
                resetOrdersStore();
                router.push("/");
              }}
              className="self-start p-2 bg-dark text-light"
            >
              Logout
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
      </div>
      <div
        className={`cart-drawer fixed min-h-screen w-[300px] bg-light right-0 transition-all spaced ${
          drawer ? "" : "translate-x-full"
        }`}
      >
        Your Cart
        <Cart cart={cart} />
      </div>
      {children}
    </div>
  );
}
