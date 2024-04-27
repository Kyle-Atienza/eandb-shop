"use client";

import { Button } from "@/components/common/button";
import { useRouter } from "next/navigation";

export function ProductFilter() {
  const router = useRouter();

  return (
    <div className=" flex flex-wrap gap-spaced-md">
      <Button
        onClick={() => router.push("/products/list?filter=oyster-mushroom")}
      >
        Oyster Mushroom
      </Button>
      <Button onClick={() => router.push("/products/list?filter=banana")}>
        Banana
      </Button>
      <Button onClick={() => router.push("/products/list?filter=taro")}>
        Taro
      </Button>
      <Button onClick={() => router.push("/products/list")}>All</Button>
    </div>
  );
}
