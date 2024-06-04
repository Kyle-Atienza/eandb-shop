import { Footer } from "@/components/common/footer";
import { Catalog } from "@/components/pages/home/catalog";
import { Hero } from "@/components/pages/home/hero";

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
      <Hero />
      <div className="catalog spaced-x spaced-t">
        <Catalog
          productListingOptions={productListingOptions}
          filter={searchParams?.products}
        />
      </div>
      {/* <Footer /> */}
    </>
  );
}
