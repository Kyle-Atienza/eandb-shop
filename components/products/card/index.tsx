import Image from "next/image";
import { useRouter } from "next/navigation";

import gsap from "gsap";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(useGSAP);

import { useRef } from "react";

interface ProductCard {
  _id: string;
  details: Product;
  options: ProductItem[];
}

export function ProductCard({
  product,
  index,
  rowSpanItems = [],
  colSpanItems = [],
  rowAutoItems = [],
  className,
}: {
  product: ProductCard;
  index: number;
  rowSpanItems?: number[];
  colSpanItems?: number[];
  rowAutoItems?: number[];
  className?: string;
}) {
  const router = useRouter();

  const container = useRef(null);

  console.log(product);

  return (
    <div
      ref={container}
      className={`product-card transition-all flex flex-col relative group mt-auto
      
      `}
      onClick={() => router.push(`/product/${product._id}`)}
    >
      <div className="hover-trigger absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-10 w-[110%] h-[110%] flex items-center justify-center bg-light opacity-0"></div>
      <div className="relative flex flex-col gap-spaced-sm ">
        {/* <div className="flex justify-between gap-spaced-sm text-light">

          <div className=" text-dark bg-light p-4 rounded-md font-medium self-start">
            <p className="text-md lg:text-xl font-gopher">
              {product.details.name}
            </p>
          </div>
          <div className=" text-dark bg-light p-4 rounded-md font-medium self-start">
            <p className="text-sm lg:text-md font-gopher">100.00</p>
          </div>
        </div> */}
        <div className="flex justify-between items-end gap-spaced-sm text-light">
          <p className="text-md lg:text-xl font-gopher w-[30%]">
            {product.details.name}
          </p>
          <p className="text-md lg:text-xl font-gopher">
            100.00 <span className="text-xs lg:text-sm">PHP</span>
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
