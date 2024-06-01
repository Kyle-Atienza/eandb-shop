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
import { useState } from "react";

export default async function Page({
  params,
  searchParams,
}: {
  params: { slug: string[] };
  searchParams?: {
    [key: string]: string | string[] | undefined;
    variant?: string;
  };
}) {
  const [product, option] = params.slug;

  const {
    productDetails,
    productPageItem,
    selectedVariant,
    getRecommendations,
  } = await useProduct(
    `${product}${option ? `/${option}` : ""}`,
    searchParams?.variant
  );

  const image = selectedVariant
    ? selectedVariant.images.find((image) => image.tag === "three fourths")?.url
    : null;

  // console.log(selectedVariant.images);

  return (
    <>
      <div className="relative">
        <div className="sticky top-[100px] z-20">
          <BackButton />
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-2 mt-[-40px]">
          <div className=" bg-light ">
            <div className="lg:relative h-[calc(100vh-70px)] sticky top-0 grid place-content-center">
              {image ? (
                <Image
                  src={image}
                  fill
                  alt={`product image`}
                  objectFit="cover"
                  priority
                />
              ) : (
                <p className="font-gopher">No Image provided</p>
              )}
            </div>
            <div className="z-10 relative spaced-x lg:hidden">
              <div className="bg-tertiary container mx-auto">
                <ProductSelect pageItem={productPageItem} />
              </div>
            </div>
            <div className="relative h-[75vh] lg:h-[calc((100vh-70px)/2)] flex items-center spaced-x justify-center  text-center flex-col bg-light">
              <div className="container flex flex-col items-center gap-spaced">
                {productPageItem.taglines ? (
                  <HeaderOne className=" text-tertiary">
                    {productPageItem.taglines}
                  </HeaderOne>
                ) : null}
                <div className="text-2xl text-dark font-merchant w-1/2 leading-[0.9em]">
                  {productPageItem.awards?.map((award, index) => {
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
            <ProductSelect pageItem={productPageItem} />
          </div>
        </div>
        {<ProductSuggestedItems items={getRecommendations()} />}
      </div>
    </>
  );
}
