"use client";

import { Button } from "@/components/common/button";
import { useRouter } from "next/navigation";

export function ProductFilter() {
  const router = useRouter();

  return (
    <div className=" flex flex-wrap gap-spaced-md">
      <Button onClick={() => router.push("/products/oyster-mushroom")}>
        Oyster Mushroom
      </Button>
      <Button onClick={() => router.push("/products/banana")}>Banana</Button>
      <Button onClick={() => router.push("/products/taro")}>Taro</Button>
      <Button onClick={() => router.push("/products/all")}>All</Button>
    </div>
  );
}
