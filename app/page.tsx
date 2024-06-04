import { Footer } from "@/components/common/footer";
import { Catalog } from "@/components/pages/home/catalog";
import { Hero } from "@/components/pages/home/hero";

export default async function Home({
  searchParams,
}: {
  searchParams?: {
    [key: string]: string | string[] | undefined;
    products?: string;
  };
}) {
  return (
    <>
      <Hero />
      <div className="catalog spaced-x spaced-t">
        <Catalog filter={searchParams?.products} />
      </div>
      {/* <Footer /> */}
    </>
  );
}
