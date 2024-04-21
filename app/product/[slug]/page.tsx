"use client";

import { useProductsStore } from "@/state/products";
import { useOrdersStore } from "@/state/orders";

import { useEffect, useState } from "react";

import Image from "next/image";

import { Label } from "@/components/common/label";
import { LabelButton } from "@/components/common/button";

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
    <div className="flex h-full gap-spaced">
      <div className="flex flex-col flex-1 sticky top-[100px] h-[calc(100vh-100px)] spaced-b">
        <div className="relative w-full h-full overflow-hidden rounded bg-light">
          {product?.image ? (
            <Image
              src={product?.image}
              fill
              alt={`${product.name} image`}
              objectFit="cover"
              priority
            />
          ) : null}
        </div>
        {/* <div>{product?.amount}</div>
        <button
          className="self-start p-2 bg-dark text-light"
          onClick={() => addToCart(product?._id ?? "")}
        >
          Add to Cart
        </button> */}
      </div>
      <div className="flex flex-col flex-1 gap-spaced h-[200vh]">
        <div className="flex flex-col gap-spaced-sm">
          <h1 className="text-5xl text-light font-ranille">{product?.name}</h1>
          <p className="text-md font-gopher text-light">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim
            ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut
            aliquip ex ea commodo consequat. Duis aute irure dolor in
            reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
            pariatur. Excepteur sint occaecat cupidatat non proident, sunt in
            culpa qui officia deserunt mollit anim id est laborum.
          </p>
        </div>
        <div className="w-full h-[1px] divider bg-light" />
        <div className="flex flex-col gap-spaced">
          {/* select component */}
          <div className="flex flex-col gap-spaced-sm">
            <label htmlFor="flavors" className="text-light">
              <Label>Flavors:</Label>
            </label>
            <div className="flex rounded-md spaced-sm bg-light">
              <select
                className="w-full font-gopher focus:outline-0"
                name=""
                id="flavors"
              >
                {/* <option value="" selected hidden>
                Flavors
              </option> */}
                <option value="" selected>
                  Plain
                </option>
                <option value="">Barbeque</option>
                <option value="">Sour Cream</option>
                <option value="">Cheese</option>
              </select>
            </div>
          </div>
          <div className="flex flex-col gap-spaced-sm w-min">
            <label htmlFor="flavors" className="text-light">
              <Label>Quantity:</Label>
            </label>
            <div className="flex border-2 rounded-md border-light spaced-sm">
              <button className="transition-colors rounded-sm bg-light spaced-md text-dark hover:bg-primary font-gopher">
                +
              </button>
              <input
                className="w-24 text-center bg-base text-light spaced-md"
                defaultValue={1}
                type="text"
                id="quantity"
              />
              <button className="transition-colors rounded-sm bg-light spaced-md text-dark hover:bg-primary font-gopher">
                +
              </button>
            </div>
          </div>
        </div>
        <div className="sticky bottom-0 flex mt-auto spaced-b">
          <button className="w-full transition-colors rounded bg-light spaced-md text-dark hover:bg-primary font-gopher">
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
}
