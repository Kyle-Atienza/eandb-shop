import { ProductsGrid } from "@/components/pages/products/grid";
import { ProductCard } from "@/components/products/card";
import { ProductFilter } from "@/components/products/filter";
import { useParams } from "next/navigation";

const getProductList = async (group: string) => {
  /* const params = new URLSearchParams();

  Object.keys(searchParams).forEach((searchParam) =>
    params.set(searchParam, `${searchParams[searchParam]}`)
  ); */

  const res = await fetch(`${process.env.BASE_URL}/products/list/${group}`);
  return await res.json();
};

export default async function Page({
  params,
  searchParams,
}: {
  params: { group: string };
  searchParams: SearchParams;
}) {
  const productList: ProductListingItem[] = await getProductList(params.group);

  return (
    <>
      <div className="flex flex-col gap-spaced mt-[65vh]">
        <ProductsGrid productList={productList} />
      </div>
    </>
  );
}
