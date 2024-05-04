"use client";

import { Button } from "@/components/common/button";
import { TransitionLink } from "@/components/common/transition-link";
import { useRouter, useSearchParams, usePathname } from "next/navigation";

const filterButtons = ["Oyster Mushroom", "Banana", "Taro"];

export function ProductFilter() {
  const router = useRouter();
  const pathName = usePathname();
  const searchParams = useSearchParams();

  return (
    <div className=" flex flex-wrap gap-spaced-md">
      {filterButtons.map((filterButton, index) => {
        return (
          <TransitionLink
            key={index}
            href={`/products/list?group=${filterButton}`}
          >
            <Button active={searchParams.get("group") === filterButton}>
              {filterButton}
            </Button>
          </TransitionLink>
        );
      })}
      <Button
        onClick={() => router.push("/products/list")}
        active={!searchParams.has("group") && pathName === "/products/list"}
      >
        All
      </Button>
    </div>
  );
}

/* {filterButtons.map((filterButton, index) => {
  return (
    <Button
      key={index}
      onClick={() => router.push(`/products/list?group=${filterButton}`)}
      active={searchParams.get("group") === filterButton}
    >
      {filterButton}
    </Button>
  );
})} */
