import { BentoHome } from "@/components/pages/home/products-bento";
import { ProductFilter } from "@/components/products/filter";
import { Suspense } from "react";

export default function Home() {
  console.log(`${process.env.NEXT_PUBLIC_BASE_URL}`);

  return (
    <>
      <div className="h-[30vh] relative"></div>
      <Suspense>
        <ProductFilter />
      </Suspense>
      <div className="spaced-t">
        <BentoHome />
      </div>
    </>
  );
}
