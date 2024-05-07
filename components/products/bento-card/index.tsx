import Image from "next/image";
import { useRouter } from "next/navigation";

import { parseProductListItemId } from "@/utils/products";

import gsap from "gsap";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(useGSAP);

import { useRef } from "react";
import Link from "next/link";
import { TransitionLink } from "@/components/common/transition-link";

export function ProductBentoCard({
  product,
  index,
  rowSpanItems = [],
  colSpanItems = [],
  rowAutoItems = [],
  className,
}: {
  product: Product;
  index?: number;
  rowSpanItems?: number[];
  colSpanItems?: number[];
  rowAutoItems?: number[];
  className?: string;
}) {
  const router = useRouter();
  const rotation = Math.random() * 18 - 8;
  const transform = {
    rotate: `${Math.random() * 5 - 5}deg`,
    translate: `(${Math.random() * 18 - 8}%, ${Math.random() * 18 - 8}%)`,
  };

  const container = useRef(null);

  return (
    <div
      ref={container}
      className={`product-card transition-all rounded flex flex-col relative group
      ${className ?? "aspect-[3/5] lg:aspect-square"}
      `}
      style={transform}
    >
      <div className="relative flex w-full h-full overflow-hidden rounded ">
        <div className="relative flex-1 transition-opacity group-hover:opacity-80 bg-dark">
          <div className="absolute left-0 top-0 w-full h-full z-10 spaced-md">
            <div className="relative w-full h-full">
              <div className="bg-light text-dark spaced-md rounded-md font-medium absolute top-0 transition-transform lg:-translate-y-[200%] group-hover:-translate-y-0">
                <p className="text-sm lg:text-xl font-gopher">
                  {product?.name}
                </p>
              </div>
              {product?.items.length > 1 ? (
                <div className="absolute bottom-0 right-0 font-medium flex flex-wrap gap-spaced-sm transition-transform lg:translate-y-[200%] group-hover:translate-y-0">
                  {product.items.map((item, index) => {
                    return (
                      <TransitionLink
                        href={`/product/${parseProductListItemId(
                          item.name
                            ? `${product.name} ${item.name}`
                            : `${item.name}`
                        )}`}
                        key={index}
                      >
                        <div className="transition-colors rounded-md bg-primary text-light hover:bg-light hover:text-primary spaced-sm">
                          <p className="text-xs lg:text-lg font-gopher">
                            {item.name}
                          </p>
                        </div>
                      </TransitionLink>
                    );
                  })}
                </div>
              ) : (
                <TransitionLink
                  className="w-full h-full"
                  href={`/product/${parseProductListItemId(
                    product?.name || ""
                  )}`}
                />
              )}
            </div>
          </div>
          {product?.gallery.length ? (
            <Image
              className={`transition-all object-cover object-center`}
              src={product?.gallery[0]}
              alt=""
              fill={true}
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              priority
            />
          ) : null}
        </div>
      </div>
    </div>
  );
}
