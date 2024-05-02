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
                className="bg-primary text-light transition-colors rounded-md spaced-sm self-start"
              >
                <p className="text-xs lg:text-lg font-gopher text-end whitespace-nowrap">
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
  const amount = () => {
    const prizes = product?.options
      .reduce((prizes: number[], option: ProductCardOption) => {
        if (!prizes.includes(option.amount)) {
          prizes.push(option.amount);
        }
        return prizes;
      }, [])
      .sort((a: number, b: number) => a - b);

    if (prizes.length > 1) {
      return <>{`${prizes[0]} - ${prizes[prizes.length - 1]}`}</>;
    } else {
      return <>{`${prizes[0]}`}</>;
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
      {/* <div className="hover-trigger absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-10 w-[120%] h-[120%] flex items-center justify-center bg-light opacity-0"></div> */}
      <div className="rounded overflow-hidden">
        <div className="aspect-[4/5] relative">
          {product.details.gallery.length ? (
            <Image
              className={`transition-all object-cover object-center`}
              src={product.details.gallery[0]}
              alt=""
              fill={true}
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              priority
            />
          ) : null}
          <div className="absolute spaced-md h-full w-full top-0 left-0 flex items-end">
            <Options className="options" options={options} />
            <Options className="options" options={options} />
            <Options className="options" options={options} />
          </div>
        </div>
        <div className="spaced-md flex flex-col gap-spaced">
          <div className="w-1/3 spaced-b-sm">
            <p className="text-sm lg:text-xl font-gopher">{product.name}</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export function ProductCardOld({ product }: { product: ProductListingItem }) {
  const router = useRouter();
  const amount = () => {
    const prizes = product?.options
      .reduce((prizes: number[], option: ProductCardOption) => {
        if (!prizes.includes(option.amount)) {
          prizes.push(option.amount);
        }
        return prizes;
      }, [])
      .sort((a: number, b: number) => a - b);

    if (prizes.length > 1) {
      return <>{`${prizes[0]} - ${prizes[prizes.length - 1]}`}</>;
    } else {
      return <>{`${prizes[0]}`}</>;
    }
  };

  return (
    <div
      className={`product-card transition-all flex flex-col relative group mt-auto
      
      `}
      onClick={() => router.push(`/product/${product._id}`)}
    >
      <div className="relative flex flex-col gap-spaced-sm ">
        <div className="flex justify-between items-end gap-spaced-sm text-light">
          <p className="text-md lg:text-xl font-gopher w-[30%]">
            {product.name}
          </p>
          <p className="text-md lg:text-xl font-gopher">
            {amount()} <span className="text-xs lg:text-sm">PHP</span>
          </p>
        </div>
        <div className="w-full h-[2px] divider bg-light" />

        <div className="aspect-square rounded-md overflow-hidden relative transition-shadow group-hover:shadow-2xl">
          <div className="hover-trigger absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-10 w-[120%] h-[120%] flex items-center justify-center bg-light opacity-0"></div>
          <Image
            className={`transition-all object-cover object-center `}
            src="https://res.cloudinary.com/dfdw1yzkk/image/upload/v1712994720/E%20and%20B%20Farm/products/images/square/af8k4pwotuc9p9nlb6aa.png"
            alt=""
            fill={true}
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            priority
          />
        </div>
      </div>
    </div>
  );
}
