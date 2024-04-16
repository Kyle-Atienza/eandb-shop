"use client";

import { useProductsStore } from "@/state/products";
import { useEffect, useState } from "react";

import Image from "next/image";

export default function Page({ params }: { params: { slug: string } }) {
  const { products, getProducts } = useProductsStore();
  const [product, setProduct] = useState<Product>();

  useEffect(() => {
    console.log(products);
    if (products.length) {
      setProduct(products.find((el) => el._id === params.slug));
    } else {
      getProducts();
    }
  }, [products]);

  return (
    <div className="flex flex-col">
      <div>Name: {params.slug}</div>
      <div>{product?.name}</div>
      <div>
        {product?.image ? (
          <Image
            src={product?.image}
            width={500}
            height={500}
            alt={`${product.name} image`}
          />
        ) : null}
      </div>
      <div>{product?.amount}</div>
      <button className="self-start p-2 bg-dark text-light">Add to Cart</button>
    </div>
  );
}
