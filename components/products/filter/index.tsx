import { LabelButton } from "@/components/common/button";
import { useRouter } from "next/navigation";

export function ProductFilter() {
  const router = useRouter();

  return (
    <div className=" mt-[25vh] flex flex-wrap gap-spaced-md">
      <LabelButton>Oyster Mushroom</LabelButton>
      <LabelButton>Banana</LabelButton>
      <LabelButton>Taro</LabelButton>
      <LabelButton onClick={() => router.push("/products")}>All</LabelButton>
    </div>
  );
}
