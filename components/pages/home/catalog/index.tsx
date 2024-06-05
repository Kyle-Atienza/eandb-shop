/* 
import { Select } from "@/components/common/forms/select";
import { ChangeEvent, useEffect, useState } from "react";
import { useProductsStore } from "@/state/products";
import { usePathname, useRouter } from "next/navigation"; 
*/
import { ProductsGrid } from "../../products/grid";

/* const productFilters = [
  {
    value: "all",
    label: "All",
  },
  {
    value: "oyster-mushroom",
    label: "Oyster Mushroom",
  },
  {
    value: "banana",
    label: "Banana",
  },
  {
    value: "taro",
    label: "Taro",
  },
]; */

const getProductsOptions = async (group?: string) => {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}/products/options/${
      group ? group : "all"
    }`,
    { next: { revalidate: 10 } }
  );
  return await res.json();
};

export async function Catalog({ filter }: { filter?: string }) {
  /* const pathname = usePathname();
  const router = useRouter(); */

  const productListingOptions = await getProductsOptions(filter);

  return (
    <div className="min-h-screen">
      {/* move to client component */}
      {/* <div className="sticky h-[100px] w-fit top-0 z-20 flex items-center">
        <Select
          className="w-[100px] md:w-[200px]"
          innerClassName="!bg-secondary border-light border-2"
          options={productFilters}
          value={filter}
          onChange={(e: ChangeEvent<HTMLSelectElement>) => {
            console.log(e.target.value);
            if (e.target.value !== "all") {
              router.push(`${pathname}?products=${e.target.value}`, {
                scroll: false,
              });
            } else {
              router.push("/");
            }
          }}
        />
      </div> */}
      <div className="spaced-t">
        <ProductsGrid productListingOptions={productListingOptions} />
      </div>
    </div>
  );
}
