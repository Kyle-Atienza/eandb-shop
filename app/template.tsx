"use client";

import React, { useEffect } from "react";
import { useOptionsStore } from "@/state/options";
import { useUserStore } from "@/state/user";
import { useOrdersStore } from "@/state/orders";

import { useRouter } from "next/navigation";

import { AnimatedCursor } from "@/components/template/animated-cursor";
import { Navbar } from "@/components/template/navbar";
import { Drawer } from "@/components/template/drawer";

import gsap from "gsap";
import { useGSAP } from "@gsap/react";
gsap.registerPlugin(useGSAP);

export default function Template({ children }: { children: React.ReactNode }) {
  const router = useRouter();

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
      <Drawer />
      <div className="spaced-x">{children}</div>
    </div>
  );
}
