"use client";

import React, { useEffect } from "react";
import { useOptionsStore } from "@/state/options";
import { useUserStore } from "@/state/user";
import { useOrdersStore } from "@/state/orders";

import { useRouter } from "next/navigation";

import { AnimatedCursor } from "@/components/template/animated-cursor";
import { Navbar } from "@/components/template/navbar";
import { Drawer } from "@/components/template/drawer";

import toast, { Toaster } from "react-hot-toast";

import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { animatePageIn } from "@/utils/animations";
gsap.registerPlugin(useGSAP);

export default function Template({ children }: { children: React.ReactNode }) {
  const router = useRouter();

  const { drawer, closeDrawer } = useOptionsStore();
  const { user, checkSavedUser } = useUserStore();
  const { getCart } = useOrdersStore();

  useEffect(() => {
    if (user) {
      getCart();
    }
  }, [user]);

  useEffect(() => {
    checkSavedUser();
    animatePageIn();
    if (drawer) {
      closeDrawer();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="flex flex-col min-h-screen spaced-x-hidden">
      <div className="sticky top-0 z-20 spaced-b">
        <AnimatedCursor />
        <Navbar />
        <Drawer />
        <div
          className={`w-full h-full fixed top-0 left-0 ${
            !drawer ? "pointer-events-none" : ""
          }`}
          onClick={closeDrawer}
        ></div>
        <Toaster />
      </div>
      <main id="main" className="flex flex-col flex-1 opacity-0">
        <div
          className={`grid relative flex-1 spaced-x transition-opacity duration-500 ${
            drawer ? "pointer-events-none opacity-30" : ""
          }`}
        >
          {children}
        </div>
      </main>
    </div>
  );
}
