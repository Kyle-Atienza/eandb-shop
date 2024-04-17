"use client";

import { useProductsStore } from "@/state/products";
import { useOrdersStore } from "@/state/orders";

import { useEffect, useState } from "react";

import Image from "next/image";

export default function Page({ params }: { params: { slug: string } }) {
  const { products, getProducts } = useProductsStore();
  const { addToCart } = useOrdersStore();

  const [product, setProduct] = useState<Product>();

  useEffect(() => {
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
      <button
        className="self-start p-2 bg-dark text-light"
        onClick={() => addToCart(product?._id ?? "")}
      >
        Add to Cart
      </button>
    </div>
  );
}
