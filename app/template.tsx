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
    if (drawer) {
      closeDrawer();
    }
  }, [router]);

  useEffect(() => {
    if (user) {
      getCart();
    }
  }, [user]);

  useEffect(() => {
    checkSavedUser();
    animatePageIn();
  }, []);

  useEffect(() => {}, []);

  return (
    <div className="flex flex-col min-h-screen">
      <div className="z-20 sticky top-0">
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
      <div id="main" className="opacity-0">
        <main
          className={`grid relative flex-1 spaced-x transition-opacity ${
            drawer ? "pointer-events-none opacity-50" : ""
          }`}
        >
          {children}
        </main>
      </div>
    </div>
  );
}
