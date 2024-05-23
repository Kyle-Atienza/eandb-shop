"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";

import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { useRef } from "react";

gsap.registerPlugin(useGSAP);

interface ProductCardOption extends ProductItem {
  amount: number;
}

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

  const options = product.options.reduce((optionList: string[], option) => {
    option.attributes.forEach((optionItem) =>
      optionList.push(optionItem.value)
    );
    return optionList;
  }, []);
  const router = useRouter();
  const rotation = Math.random() * 10 - 5;
  const getAmount = () => {
    const prizes = product?.options
      .reduce((prizes: number[], option: ProductCardOption) => {
        if (!prizes.includes(option.amount)) {
          prizes.push(option.amount);
        }
        return prizes;
      }, [])
      .sort((a: number, b: number) => a - b);

    if (prizes.length > 1) {
      return (
        <>{`P${prizes[0].toFixed(2)} - P${prizes[prizes.length - 1].toFixed(
          2
        )}`}</>
      );
    } else {
      return <>{`P${prizes[0].toFixed(2)}`}</>;
    }
  };

  useGSAP(
    () => {
      gsap.to(".options", {
        xPercent: -100,
        repeat: -1,
        duration: 8,
        ease: "none",
      });
    },
    { scope: container }
  );

  return (
    <div
      className={`product-card transition-all flex flex-col relative group mt-auto bg-light rounded group
      
      `}
      onClick={() => router.push(`/product/${product._id}`)}
      ref={container}
    >
      <div className="overflow-hidden rounded">
        <div className="aspect-[4/5] relative overflow-hidden">
          {product.details.gallery.length ? (
            <Image
              className={`transition-all object-cover object-center group-hover:scale-105 duration-500`}
              src={product.details.gallery[0]}
              alt=""
              fill={true}
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              priority
            />
          ) : null}
          <div className="absolute top-0 left-0 flex items-end justify-center w-full h-full spaced-md">
            <Options className="options" options={options} />
            <Options className="options" options={options} />
            <Options className="options" options={options} />
          </div>
        </div>
        <div className="flex spaced-md justify-between">
          <div className="w-2/5 lg:w-1/3 spaced-b-sm ">
            <p className="text-md lg:text-xl font-gopher">{product.name}</p>
          </div>
          <div className="rotate-90 md:rotate-0 origin-top-right">
            <p className="text-xl lg:text-3xl font-merchant translate-x-full md:translate-x-0">
              {getAmount()}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
