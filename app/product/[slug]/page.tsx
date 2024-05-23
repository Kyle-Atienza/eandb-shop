import productImage from "@/public/product-detail-temp.webp";
import nutrifacts from "@/public/nutrition-facts-label-download-image1 1.png";

import Image from "next/image";

import { Label } from "@/components/common/label";
import { ProductSelect } from "@/components/pages/product/select";
import { HeaderOne, HeaderTwo } from "@/components/common/header";
import { ProductDetails } from "@/components/pages/product/details";
import { useProduct } from "@/hooks/useProduct";
import { ProductRelatedItems } from "@/components/pages/product/related";

export default async function Page({ params }: { params: { slug: string } }) {
  const { product, productItem } = await useProduct(params.slug);

  return (
    <>
      <div className="grid grid-cols-2">
        <div className="spaced-x spaced-b bg-light mt-[-40px]">
          <div className="relative h-[calc(100vh-70px)]">
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-2/3 h-2/3 border-2 border-primary"></div>
            <Image
              src={productImage}
              fill
              alt={`${product.name} image`}
              objectFit="cover"
              priority
            />
          </div>
          <div className="relative h-[calc((100vh-70px)/2)] flex items-center spaced-x mt-[40px] text-center flex-col gap-spaced">
            <HeaderOne className=" text-tertiary">
              Guilt free goodness in every crunch!
            </HeaderOne>
            <div className="text-2xl text-dark font-merchant w-1/2 leading-[0.9em]">
              Most Innovative Product of MIMAROPA 2016
            </div>
          </div>

          <ProductDetails />
        </div>
        <div className="spaced-x">
          <div className="h-[calc(100vh-100px)] sticky top-[100px] mt-[35vh] overflow-hidden flex flex-col justify-center">
            <div className="flex justify-between">
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
                eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
                enim ad minim veniam, quis nostrud exercitation ullamco laboris
                nisi ut aliquip ex ea commodo consequat.{" "}
              </p>
              <p>
                Duis aute irure dolor in reprehenderit in voluptate velit esse
                cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat
                cupidatat non proident, sunt in culpa qui officia deserunt
                mollit anim id est laborum.
              </p>
            </div>
            <div className="border-t-2 border-light">
              <ProductSelect productItem={productItem} product={product} />
            </div>
          </div>
        </div>
      </div>
      {/* <div className="spaced border-t-2 border-light">
        <Label className="whitespace-pre-line text-light">
          Related{"\n"}Products
        </Label>
      </div> */}
      {/* <ProductRelatedItems items={productItem} /> */}
    </>
  );
}

{
  /* <div className="md:flex gap-spaced mt-4 *:spaced-b">
        <div className="flex flex-col flex-1 h-[65vw] md:h-[calc(100vh-100px)] md:sticky md:top-[100px]">
          <div className="relative w-full h-full overflow-hidden rounded bg-light">
            {product?.details.gallery[0] ? (
              <Image
                src={product?.details.gallery[0]}
                fill
                alt={`${product.name} image`}
                objectFit="cover"
                priority
              />
            ) : null}
          </div>
        </div>
        <div className="flex flex-col flex-1 gap-spaced spaced-t lg:spaced-t-none">
          <div className="flex flex-col gap-spaced">
            <div className="flex gaps-spaced-sm">
              <div className="flex gap-spaced-sm">
                <div className="flex flex-col gap-spaced-sm">
                  <h1 className="text-5xl text-light font-ranille">
                    {product?.name}
                  </h1>
                  <h2 className="flex items-baseline gap-2 text-3xl text-light font-ranille">
                    {productItem?.amount.toFixed(2)}
                    <span className="">
                      <Label>PHP</Label>
                    </span>
                  </h2>
                  <p className="text-md font-gopher text-light">
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed
                    do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                    Ut enim ad minim veniam, quis nostrud exercitation ullamco
                    laboris nisi ut aliquip ex ea commodo consequat. Duis aute
                    irure dolor in reprehenderit in voluptate velit esse cillum
                    dolore eu fugiat nulla pariatur. Excepteur sint occaecat
                    cupidatat non proident, sunt in culpa qui officia deserunt
                    mollit anim id est laborum.
                  </p>
                </div>
              </div>
            </div>
            <div>
              <Divider />
            </div>
            <ProductDetails
              productList={productList}
              slug={params.slug}
              productItem={productItem}
              product={product}
            />
          </div>
        </div>
      </div> */
}
