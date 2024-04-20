import Image from "next/image";
import { useRouter } from "next/navigation";

import gsap from "gsap";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(useGSAP);

import { useRef } from "react";

export function ProductCard({
  product,
  index,
  rowSpanItems = [],
  colSpanItems = [],
  rowAutoItems = [],
}: {
  product: Product;
  index: number;
  rowSpanItems?: number[];
  colSpanItems?: number[];
  rowAutoItems?: number[];
}) {
  const router = useRouter();

  const container = useRef(null);
  const pickMeSvg = useRef(null);

  /* useGSAP(
    () => {
      gsap.to(pickMeSvg.current, {
        rotation: 360,
        duration: 8,
        repeat: -1,
        ease: "linear",
      });
    },
    { scope: container }
  ); */

  return (
    <div
      ref={container}
      className={`product-card transition-all bg-white rounded bg-dark flex flex-col relative group
      ${rowSpanItems.includes(index) ? "row-span-2 aspect-auto" : ""}
      ${colSpanItems.includes(index) ? "col-span-2 aspect-auto" : ""}
      ${
        rowSpanItems.includes(index) || colSpanItems.includes(index)
          ? ""
          : "aspect-square"
      }
      `}
      onClick={() => router.push(`/product/${product._id}`)}
    >
      <div className="hover-trigger absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-10 w-[120%] h-[120%] aspect-square flex items-center justify-center"></div>
      <div className="relative flex w-full h-full overflow-hidden rounded ">
        <div className="relative flex-1 transition-opacity group-hover:opacity-80">
          <Image
            className={`transition-all`}
            src="https://res.cloudinary.com/dfdw1yzkk/image/upload/v1712994720/E%20and%20B%20Farm/products/images/square/af8k4pwotuc9p9nlb6aa.png"
            alt=""
            fill={true}
            objectFit="cover"
            objectPosition="center"
          />
        </div>
        <div className="absolute w-full h-full spaced-small font-gopher group">
          <div className="relative w-full h-full">
            <div className="bg-light text-dark p-4 rounded-small font-medium absolute top-0 transition-transform -translate-y-[200%] group-hover:-translate-y-0">
              <p className="text-xl">
                {/* {index} */}

                {product.name}
              </p>
            </div>
            {product.attribute ? (
              <div className="absolute bottom-0 right-0 p-4 font-medium bg-primary text-light rounded-small transition-transform translate-y-[200%] group-hover:translate-y-0">
                <p className="text-xl">{product.attribute}</p>
              </div>
            ) : null}
          </div>
        </div>
      </div>
    </div>
  );
}
