import { ProductsGrid } from "@/components/pages/products/grid";
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
      <div className="flex flex-col gap-spaced mt-[40vh]">
        <ProductsGrid productList={productList} />
        {/* <div className="sticky top-[100px] flex justify-center z-20 spaced-t">
          <ProductFilter />
        </div> */}
        {/* <div className="grid grid-cols-2 lg:grid-cols-3 gap-spaced">
          {productList?.map((listingItem, index) => {
            return <ProductCard product={listingItem} key={index} />;
          })}
        </div> */}
        {/* <div className="flex gap-spaced">
          <div className="flex flex-col gap-spaced flex-1">
            {sliceArrayEveryN(productList, 3, 1)?.map((listingItem, index) => {
              return <ProductCard product={listingItem} key={index} />;
            })}
          </div>
          <div className="flex flex-col gap-spaced flex-1 translate-y-[40vh]">
            {sliceArrayEveryN(productList, 3, 2)?.map((listingItem, index) => {
              return <ProductCard product={listingItem} key={index} />;
            })}
          </div>
          <div className="flex flex-col gap-spaced flex-1 translate-y-[10vh]">
            {sliceArrayEveryN(productList, 3, 3)?.map((listingItem, index) => {
              return <ProductCard product={listingItem} key={index} />;
            })}
          </div>
        </div> */}
      </div>
    </>
  );
}
