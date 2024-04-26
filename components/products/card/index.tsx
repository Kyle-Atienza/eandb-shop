"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";

import gsap from "gsap";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(useGSAP);

interface ProductCardOption extends ProductItem {
  amount: number;
}

interface ProductCard {
  _id: string;
  details: Product;
  options: ProductCardOption[];
}

export function ProductCard({ product }: { product: ProductCard }) {
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

  console.log(amount);

  return (
    <div
      className={`product-card transition-all flex flex-col relative group mt-auto
      
      `}
      onClick={() => router.push(`/product/${product._id}`)}
    >
      <div className="hover-trigger absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-10 w-[110%] h-[110%] flex items-center justify-center bg-light opacity-0"></div>
      <div className="relative flex flex-col gap-spaced-sm ">
        <div className="flex justify-between items-end gap-spaced-sm text-light">
          <p className="text-md lg:text-xl font-gopher w-[30%]">
            {product.details.name}
          </p>
          <p className="text-md lg:text-xl font-gopher">
            {amount()} <span className="text-xs lg:text-sm">PHP</span>
          </p>
        </div>
        <div className="w-full h-[2px] divider bg-light" />

        <div className="aspect-square rounded-md overflow-hidden relative transition-shadow group-hover:shadow-2xl">
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
