import { BentoHome } from "@/components/pages/home/products-bento";
import { ProductFilter } from "@/components/products/filter";
import { Suspense } from "react";

async function getProducts() {
  const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/products`);
  return await res.json();
}

export default async function Home() {
  const products = await getProducts();

  return (
    <>
      <div className="h-[30vh] relative"></div>
      {/* <Suspense>
        <ProductFilter />
      </Suspense> */}
      <div className="spaced-t">
        <BentoHome products={products} />
      </div>
    </>
  );
}
