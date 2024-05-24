import { Select } from "@/components/common/forms/select";
import { HeaderOne } from "@/components/common/header";
import { ScrollDown } from "@/components/decorations/scroll-down";
import { Catalog } from "@/components/pages/home/catalog";
import { ProductsGrid } from "@/components/pages/products/grid";
import { ProductFilter } from "@/components/products/filter";
import { ChangeEvent, Suspense, useState } from "react";

async function getProducts() {
  const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/products`);
  return await res.json();
}

async function getProductList(group: string) {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}/products/list/${group}`
  );
  return await res.json();
}

export default async function Home() {
  return (
    <>
      <div className="mt-[-40px]">
        <div className="bg-light h-[100vh] flex justify-center">
          <div className=" flex items-center justify-center h-[65vh] mt-[100px]">
            <HeaderOne className="text-center *:whitespace-pre-line !text-dark">
              <span className="md:hidden">
                Discover
                {"\n"}a world
                {"\n"}
                of organic and
                {"\n"}
                local goodness!
                {"\n"}
                <ScrollDown />
              </span>
              <span className="hidden md:block">
                Discover a world{"\n"}
                of organic and local
                {"\n"}
                goodness!
                <ScrollDown />
              </span>
            </HeaderOne>
          </div>
        </div>
        <div className="spaced-x spaced-t mt-[-35vh]">
          <Catalog />
        </div>
      </div>
    </>
  );
}
