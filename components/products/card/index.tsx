import Image from "next/image";
import { useRouter } from "next/navigation";

export function ProductCard({
  product,
  index,
  rowSpanItems = [],
  colSpanItems = [],
}: {
  product: Product;
  index: number;
  rowSpanItems?: number[];
  colSpanItems?: number[];
}) {
  const router = useRouter();

  /* const rowSpanItems = [1, 12];
  const colSpanItems = [8]; */

  return (
    <div
      className={`overflow-hidden transition-all bg-white rounded bg-light flex flex-col relative 
      ${rowSpanItems.includes(index) ? "row-span-2" : ""}
      ${colSpanItems.includes(index) ? "col-span-2" : ""}
      `}
      onClick={() => router.push(`/product/${product._id}`)}
    >
      <div className="flex-1 relative">
        {[...colSpanItems, ...rowSpanItems].includes(index) ? (
          <Image
            className={`transition-all`}
            src="https://res.cloudinary.com/dfdw1yzkk/image/upload/v1712994720/E%20and%20B%20Farm/products/images/square/af8k4pwotuc9p9nlb6aa.png"
            alt=""
            fill={true}
            objectFit="cover"
            objectPosition="center"
          />
        ) : (
          <Image
            className={`transition-all`}
            src="https://res.cloudinary.com/dfdw1yzkk/image/upload/v1712994720/E%20and%20B%20Farm/products/images/square/af8k4pwotuc9p9nlb6aa.png"
            alt=""
            width={500}
            height={500}
          />
        )}
      </div>
      <div className="spaced-small w-full h-full font-gopher absolute">
        <div className="relative w-full h-full">
          <div className="bg-light text-dark p-4 rounded-small font-medium absolute top-0">
            <p className="text-xl">{product.name}</p>
          </div>
          {product.attribute ? (
            <div className="bg-primary absolute text-light p-4 bottom-0 right-0 rounded-small font-medium">
              <p className="text-xl">{product.attribute}</p>
            </div>
          ) : null}
        </div>
      </div>
    </div>
  );
}
