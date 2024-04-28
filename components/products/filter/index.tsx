"use client";

import { Button } from "@/components/common/button";
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
          <Button
            key={index}
            onClick={() => router.push(`/products/list?group=${filterButton}`)}
            active={searchParams.get("group") === filterButton}
          >
            {filterButton}
          </Button>
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
