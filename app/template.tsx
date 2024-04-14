"use client";

import React, { use, useEffect } from "react";
import { useProductCardHoveredStore } from "@/state/animation";

export default function Template({ children }: { children: React.ReactNode }) {
  const { top, left, width, height } = useProductCardHoveredStore();

  useEffect(() => {
    console.log(top, left, width, height);
    const productHover = document.getElementById("productHover");
    if (productHover) {
      productHover.style.top = `${top}px`;
      productHover.style.left = `${left}px`;
      productHover.style.width = `${width}px`;
      productHover.style.height = `${height}px`;
    }
  }, [top, left, width, height]);

  return (
    <div>
      <div
        id="productHover"
        className={`fixed border-2 pointer-events-none border-primary z-50`}
      ></div>
      {children}
    </div>
  );
}
