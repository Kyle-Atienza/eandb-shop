import { HeaderOne } from "@/components/common/header";
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
  const productList: ProductListingItem[] = await getProductList(params.group);
  console.log(productList);

  return (
    <>
      <div className="flex flex-col gap-spaced">
        <div className="h-[65vh] grid place-content-center top-[100px] sticky">
          {/* <h1 className="text-6xl text-center whitespace-pre-line text-light font-ranille">
            ✨Discover✨ a world
            {"\n"}
            of organic and local
            {"\n"}
            goodness!
          </h1> */}
          <HeaderOne>
            ✨Discover✨ a world
            {"\n"}
            of organic and local
            {"\n"}
            goodness!
          </HeaderOne>
        </div>
        <ProductsGrid productList={productList} />
      </div>
    </>
  );
}
