import { ProductCard } from "@/components/products/card";
import { ProductFilter } from "@/components/products/filter";
import { useParams } from "next/navigation";

const getProductList = async (searchParams: SearchParams) => {
  // console.log(new URLSearchParams(searchParams));
  const params = new URLSearchParams();

  Object.keys(searchParams).forEach(
    (searchParam) => params.set(searchParam, `${searchParams[searchParam]}`)
    // console.log(searchParam, searchParams[searchParam])
  );

  const res = await fetch(`${process.env.BASE_URL}/products/list?${params}`);
  return await res.json();
};

export default async function Page({
  params,
  searchParams,
}: {
  params: { filter: string };
  searchParams: SearchParams;
}) {
  const productList: ProductListingItem[] = await getProductList(searchParams);

  return (
    <>
      <div className="flex flex-col gap-spaced mt-[5vh]">
        <div className="sticky top-[100px] flex justify-center z-20 spaced-t">
          <ProductFilter />
        </div>
        <div className="grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-spaced">
          {productList?.map((listingItem, index) => {
            return <ProductCard product={listingItem} key={index} />;
          })}
        </div>
      </div>
    </>
  );
}
