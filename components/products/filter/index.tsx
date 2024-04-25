import { LabelButton } from "@/components/common/button";
import { useRouter } from "next/navigation";

export function ProductFilter() {
  const router = useRouter();

  return (
    <div className=" flex flex-wrap gap-spaced-md">
      <LabelButton onClick={() => router.push("/products/oyster-mushroom")}>
        Oyster Mushroom
      </LabelButton>
      <LabelButton onClick={() => router.push("/products/banana")}>
        Banana
      </LabelButton>
      <LabelButton onClick={() => router.push("/products/taro")}>
        Taro
      </LabelButton>
      <LabelButton onClick={() => router.push("/products/all")}>
        All
      </LabelButton>
    </div>
  );
}
