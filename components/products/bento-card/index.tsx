import Image from "next/image";
import { useRouter } from "next/navigation";

import { parseProductListItemId } from "@/utils/products";

import gsap from "gsap";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(useGSAP);

import { useRef } from "react";
import Link from "next/link";

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

  const container = useRef(null);

  return (
    <div
      ref={container}
      className={`product-card transition-all rounded bg-dark flex flex-col relative group
      ${className ?? "aspect-square"}
      `}
    >
      <div className="hover-trigger absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-10 w-[120%] h-[120%] aspect-square flex items-center justify-center">
        <div className="w-[83.5%] h-[83.5%] spaced-md font-gopher group overflow-hidden">
          <div className="relative w-full h-full flex">
            <div className="bg-light text-dark p-4 rounded-md font-medium absolute top-0 transition-transform lg:-translate-y-[200%] group-hover:-translate-y-0">
              <p className="text-sm lg:text-xl">{product?.name}</p>
            </div>
            {product?.items.length > 1 ? (
              <div className="absolute bottom-0 right-0 font-medium flex flex-wrap gap-spaced-sm transition-transform lg:translate-y-[200%] group-hover:translate-y-0">
                {product.items.map((item, index) => {
                  console.log(product, item);
                  return (
                    <Link
                      href={`/product/${parseProductListItemId(
                        item.name
                          ? `${product.name} ${item.name}`
                          : `${item.name}`
                      )}`}
                      key={index}
                    >
                      <div className="bg-primary text-light hover:bg-light hover:text-primary transition-colors rounded-md spaced-sm">
                        <p className="text-xs lg:text-lg">{item.name}</p>
                      </div>
                    </Link>
                  );
                })}
              </div>
            ) : (
              <Link
                className="w-full h-full"
                href={`/product/${parseProductListItemId(product?.name || "")}`}
              />
            )}
          </div>
        </div>
      </div>
      <div className="relative flex w-full h-full overflow-hidden rounded ">
        <div className="relative flex-1 transition-opacity group-hover:opacity-80">
          <Image
            className={`transition-all object-cover object-center`}
            src="https://res.cloudinary.com/dfdw1yzkk/image/upload/v1712994720/E%20and%20B%20Farm/products/images/square/af8k4pwotuc9p9nlb6aa.png"
            alt=""
            fill={true}
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            priority
          />
        </div>
      </div>
      {/* <div className="absolute w-full h-full spaced-md font-gopher group overflow-hidden ">
        <div className="relative w-full h-full">
          <div className="bg-light text-dark p-4 rounded-md font-medium absolute top-0 transition-transform lg:-translate-y-[200%] group-hover:-translate-y-0">
            <p className="text-sm lg:text-xl">
              {product?.name}
            </p>
          </div>
          {product?.items.length > 1 ? (
            <div className="absolute bottom-0 right-0 font-medium flex flex-wrap gap-spaced-sm transition-transform lg:translate-y-[200%] group-hover:translate-y-0">
              {product.items.map((item, index) => {
                return (
                  <div
                    key={index}
                    className="bg-primary text-light rounded-md spaced-sm"
                  >
                    <p className="text-xs lg:text-lg">{item.name}</p>
                  </div>
                );
              })}
            </div>
          ) : null}
        </div>
      </div> */}
    </div>
  );
}
