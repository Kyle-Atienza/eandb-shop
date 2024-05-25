import productImage from "@/public/sample-product-image.png";
import nutrifacts from "@/public/nutrition-facts-label-download-image1 1.png";

import Image from "next/image";

import { Label } from "@/components/common/label";
import { ProductSelect } from "@/components/pages/product/select";
import { HeaderOne, HeaderTwo } from "@/components/common/header";
import { ProductDetails } from "@/components/pages/product/details";
import { useProduct } from "@/hooks/useProduct";
import { ProductSuggestedItems } from "@/components/pages/product/related";
import { BackButton } from "@/components/pages/product/back";

export default async function Page({ params }: { params: { slug: string } }) {
  const { product, suggestedItems, productDetails } = await useProduct(
    params.slug
  );

  return (
    <div className="relative">
      <div className="sticky top-[100px] z-20">
        <BackButton />
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-2 mt-[-40px]">
        <div className=" bg-light ">
          <div className="lg:relative h-[calc(100vh-70px)] sticky top-0">
            <Image
              src={productImage}
              fill
              alt={`${product.name} image`}
              objectFit="cover"
              priority
            />
          </div>
          <div className="z-10 relative spaced-x lg:hidden">
            <div className="bg-tertiary container mx-auto">
              <ProductSelect product={product} />
            </div>
          </div>
          <div className="relative h-[75vh] lg:h-[calc((100vh-70px)/2)] flex items-center spaced-x justify-center  text-center flex-col bg-light">
            <div className="container flex flex-col items-center gap-spaced">
              {product.details.taglines ? (
                <HeaderOne className=" text-tertiary">
                  {product.details.taglines}
                </HeaderOne>
              ) : null}
              <div className="text-2xl text-dark font-merchant w-1/2 leading-[0.9em]">
                {product.details.awards?.map((award, index) => {
                  return <p key={index}>{award}</p>;
                })}
              </div>
            </div>
          </div>
          <div className="spaced-x bg-light relative h-[75vh] lg:h-[calc((100vh-70px)/2)] flex flex-col justify-center">
            <ProductDetails details={productDetails} />
          </div>
        </div>
        <div className="hidden lg:block mt-[40vh]">
          <ProductSelect product={product} />
        </div>
      </div>
      <ProductSuggestedItems items={suggestedItems} />
    </div>
  );
}
