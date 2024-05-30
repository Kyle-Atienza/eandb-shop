import { HeaderOne } from "@/components/common/header";
import { ScrollDown } from "@/components/decorations/scroll-down";
import { ProductsGrid } from "@/components/pages/products/grid";
import { ProductCard } from "@/components/products/card";
import { ProductFilter } from "@/components/products/filter";
import { useParams } from "next/navigation";

export async function generateStaticParams() {
  return [
    { group: "all" },
    { group: "Oyster Mushroom" },
    { group: "Taro" },
    { group: "Banana" },
  ];
}

async function getProductList(group: string) {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}/products/list/${group}`
  );
  return await res.json();
}

export default async function Page({
  params,
  searchParams,
}: {
  params: { group: string };
  searchParams: SearchParams;
}) {
  const productList: ProductOption[] = await getProductList(params.group);

  return (
    <>
      <div className="flex flex-col gap-spaced spaced-x">
        <div className="h-[65vh] grid place-content-center top-[100px] sticky">
          <HeaderOne className="text-center">
            ✨Discover✨ a world
            {"\n"}
            of organic and local
            {"\n"}
            goodness!
          </HeaderOne>
        </div>
        <ProductsGrid productOptions={productList} />
      </div>
    </>
  );
}
