"use client";

import { Button, TransitionButton } from "@/components/common/button";
import { TransitionLink } from "@/components/common/transition-link";
import { useRouter, useSearchParams, usePathname } from "next/navigation";

const filterButtons = ["Oyster Mushroom", "Banana", "Taro"];

export function ProductFilter() {
  const router = useRouter();
  const pathName = usePathname();
  const searchParams = useSearchParams();

  return (
    <div className="flex flex-wrap gap-spaced-md">
      {filterButtons.map((filterButton, index) => {
        return (
          <TransitionButton
            key={index}
            href={`/products/list?group=${filterButton}`}
            active={searchParams.get("group") === filterButton}
          >
            {filterButton}
          </TransitionButton>
        );
      })}
      <TransitionButton
        href={"/products/list"}
        active={!searchParams.has("group") && pathName === "/products/list"}
      >
        All
      </TransitionButton>
    </div>
  );
}
