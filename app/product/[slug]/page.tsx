import productImage from "@/public/product-detail-temp.webp";
import nutrifacts from "@/public/nutrition-facts-label-download-image1 1.png";

import Image from "next/image";

import { Label } from "@/components/common/label";
import { ProductSelect } from "@/components/pages/product/select";
import { HeaderOne, HeaderTwo } from "@/components/common/header";
import { ProductDetails } from "@/components/pages/product/details";
import { useProduct } from "@/hooks/useProduct";
import { ProductRelatedItems } from "@/components/pages/product/related";

async function RightSection({ slug }: { slug: string }) {
  const { product, productItem } = await useProduct(slug);

  return (
    <div className="spaced lg:sticky top-0">
      <div className="h-fit lg:h-screen  flex flex-col justify-center">
        <div className="flex flex-col sm:flex-row justify-between spaced-b sm:spaced-none">
          <div className="w-3/5 spaced-b">
            <HeaderOne className="">{product?.name}</HeaderOne>
          </div>
          <div className=" font-merchant flex items-start">
            <div className="bg-light spaced-x-sm rounded-sm">
              <Label className="!text-3xl">
                P{productItem?.amount.toFixed(2)}
              </Label>
            </div>
          </div>
        </div>
        <div className="spaced-y border-t-2 border-light text-light font-gopher *:mb-3">
          <p>
            {" "}
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim
            ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut
            aliquip ex ea commodo consequat.{" "}
          </p>
          <p>
            Duis aute irure dolor in reprehenderit in voluptate velit esse
            cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat
            cupidatat non proident, sunt in culpa qui officia deserunt mollit
            anim id est laborum.
          </p>
        </div>
        <div className="border-t-2 border-light">
          <ProductSelect productItem={productItem} product={product} />
        </div>
      </div>
    </div>
  );
}

export default async function Page({ params }: { params: { slug: string } }) {
  const { product, productItem, relatedItems } = await useProduct(params.slug);

  return (
    <>
      <div className="grid grid-cols-1 lg:grid-cols-2 mt-[-40px]">
        <div className=" spaced-b bg-light ">
          <div className="lg:relative h-[calc(100vh-70px)] sticky top-0">
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-2/3 h-2/3 border-2 border-primary"></div>
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
              <RightSection slug={params.slug} />
            </div>
          </div>
          <div className="relative h-[75vh] lg:h-[calc((100vh-70px)/2)] flex items-center spaced-x justify-center  text-center flex-col bg-light">
            <div className="container flex flex-col items-center gap-spaced">
              <HeaderOne className=" text-tertiary">
                Guilt free goodness in every crunch!
              </HeaderOne>
              <div className="text-2xl text-dark font-merchant w-1/2 leading-[0.9em]">
                Most Innovative Product of MIMAROPA 2016
              </div>
            </div>
          </div>
          <div className="spaced-x bg-light relative h-[75vh] lg:h-[calc((100vh-70px)/2)] flex flex-col justify-center">
            <ProductDetails />
          </div>
        </div>
        <div className="hidden lg:block mt-[30vh]">
          <RightSection slug={params.slug} />
        </div>
      </div>
      <div className="spaced flex flex-col gap-spaced border-t-2 border-light mb-24">
        <Label className="whitespace-pre-line text-light">
          Related Products
        </Label>
        <div className="grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-spaced ]">
          <ProductRelatedItems items={relatedItems} />
        </div>
      </div>
    </>
  );
}
