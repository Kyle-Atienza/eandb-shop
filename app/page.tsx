import { HeaderOne } from "@/components/common/header";
import {
  InlineScrollDown,
  ScrollDown,
} from "@/components/decorations/scroll-down";
import { Catalog } from "@/components/pages/home/catalog";

const getProductsOptions = async (group?: string) => {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}/products/options/${
      group ? group : "all"
    }`,
    { next: { revalidate: 10 } }
  );
  return await res.json();
};

export default async function Home({
  searchParams,
}: {
  searchParams?: {
    [key: string]: string | string[] | undefined;
    products?: string;
  };
}) {
  const productListingOptions = await getProductsOptions(
    searchParams?.products
  );

  return (
    <>
      <div className="mt-[-40px] sticky top-[160px]">
        <div className="hero flex flex-col items-center justify-center h-[65vh] text-center ">
          <div className="flex flex-col items-center gap-spaced-md *:!text-light relative">
            <HeaderOne className="text-center *:whitespace-pre-line w-fit relative">
              <span className="md:hidden">
                Discover
                {"\n"}a world
                {"\n"}
                of organic and
                {"\n"}
                local goodness!
                {"\n"}
                <InlineScrollDown />
              </span>
              <span className="hidden md:block">
                Discover a world{"\n"}
                of organic and local
                {"\n"}
                goodness!
                <InlineScrollDown />
              </span>
            </HeaderOne>
            <div className="font-gopher w-full lg:w-2/5 text-lg lg:text-2xl relative !leading-[1em]">
              Explore a curated selection of fresh, organic, and locally sourced
              products. From farm-fresh fruits and vegetables to artisanal
              goods, experience the best nature has to offer right at your
              doorstep.
            </div>
          </div>
        </div>
      </div>
      <div className="catalog spaced-x spaced-t">
        <Catalog
          productListingOptions={productListingOptions}
          filter={searchParams?.products}
        />
      </div>
    </>
  );
}
