"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";

import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { useRef } from "react";
import Link from "next/link";

gsap.registerPlugin(useGSAP);

function Options({
  options,
  className,
}: {
  options: string[];
  className: string;
}) {
  return (
    <div className={`flex gap-spaced-xs spaced-r-xs ${className}`}>
      {options.length > 1
        ? options.map((option, index) => {
            return (
              <div
                key={index}
                className="self-start transition-colors rounded-md text-light spaced-y-sm spaced-x-md bg-primary"
              >
                <p className="text-xs lg:text-xl uppercase tracking-widest font-merchant text-end whitespace-nowrap">
                  {option}
                </p>
              </div>
            );
          })
        : null}
    </div>
  );
}

export function ProductCard({ product }: { product: ProductListingItem }) {
  const container = useRef(null);

  const images = product.variants
    .map((variant) => variant.images)
    .flat()
    .filter((image) => image.tag === "three fourths");
  const displayPrize = product.variants
    .map((variant) => variant.amount)
    .sort((a, b) => (a > b ? -1 : 1))[0];
  const variantTags = product.variants.map(
    (variant) => variant.attribute?.value
  );
  const path = `${product.details.name}/${
    product.name ? `${product.name}` : ""
  }`
    .toLocaleLowerCase()
    .replaceAll(" ", "-");

  useGSAP(
    () => {
      if (variantTags.length) {
        gsap.to(".options", {
          xPercent: -100,
          repeat: -1,
          duration: 8,
          ease: "none",
        });
      }
    },
    { scope: container }
  );

  return (
    <Link
      className={`product-card transition-all flex flex-col relative group mt-auto bg-light rounded group border-2 border-tertiary
      
      `}
      href={`/product/${path}`}
      ref={container}
    >
      <div className="overflow-hidden rounded">
        <div className="aspect-[4/5] relative">
          <div className="absolute w-[130%] h-[130%] top-[-10%] left-1/2 -translate-x-1/2">
            {images.length ? (
              <Image
                className={`transition-all object-cover object-center group-hover:scale-105 duration-500`}
                src={images[0].url}
                alt=""
                fill={true}
                objectFit="cover"
                priority
              />
            ) : (
              <div className="grid place-content-center h-full">
                <p className="font-gopher">No Image Provided</p>
              </div>
            )}
          </div>

          {variantTags.length ? (
            <div className="absolute top-0 left-0 flex items-end justify-center w-full h-full spaced-md">
              <Options className="options" options={variantTags} />
              <Options className="options" options={variantTags} />
              <Options className="options" options={variantTags} />
            </div>
          ) : null}
        </div>
        <div className="flex spaced-md justify-between">
          <div className="w-2/5 lg:w-1/3 spaced-b-sm ">
            <p className="text-md lg:text-xl font-gopher">
              {product.details.name} {product.name ? ` - ${product.name}` : ""}
            </p>
          </div>
          <div className="rotate-90 md:rotate-0 origin-top-right">
            <p className="text-xl lg:text-3xl font-merchant translate-x-full md:translate-x-0">
              P{displayPrize.toFixed(2)}
            </p>
          </div>
        </div>
      </div>
    </Link>
  );
}
