"use client";

import { Button, TransitionButton } from "@/components/common/button";
import { TransitionLink } from "@/components/common/transition-link";
import { useRouter, useSearchParams, usePathname } from "next/navigation";

const filterButtons = ["Oyster Mushroom", "Banana", "Taro"];

export function ProductFilter() {
  const router = useRouter();
  const pathName = usePathname();
  const searchParams = useSearchParams();

  return (
    <div className="flex flex-wrap rounded overflow-hidden w-fit border-2 border-light *:border-r-2 *:border-light">
      {filterButtons.map((filterButton, index) => {
        return (
          <TransitionLink
            key={index}
            className="self-start transition-colors text-light spaced-md hover:bg-primary"
            href={`/products/${filterButton}`}
          >
            <p className="text-xs lg:text-sm uppercase tracking-[0.25em] font-gopher text-end whitespace-nowrap">
              {filterButton}
            </p>
          </TransitionLink>
        );
      })}
      <TransitionLink
        href={`/products/all`}
        className="self-start transition-colors text-light spaced-md border-none hover:bg-primary"
      >
        <p className="text-xs lg:text-sm uppercase tracking-[0.25em] font-gopher text-end whitespace-nowrap">
          All
        </p>
      </TransitionLink>
    </div>
  );
}

/* export function ProductFilter() {
  const router = useRouter();
  const pathName = usePathname();
  const searchParams = useSearchParams();

  return (
    <div className="flex flex-wrap gap-spaced-md">
      {filterButtons.map((filterButton, index) => {
        return (
          <>
            <div className="self-start transition-colors rounded-md text-light spaced-y-sm spaced-x-md bg-primary">
              <p className="text-xs lg:text-xl uppercase tracking-widest font-merchant text-end whitespace-nowrap">
                {filterButton}
              </p>
            </div>
          </>
        );
      })}
      <div className="self-start transition-colors rounded-md text-light spaced-y-sm spaced-x-md bg-primary">
        <p className="text-xs lg:text-xl uppercase tracking-widest font-merchant text-end whitespace-nowrap">
          All
        </p>
      </div>
    </div>
  );
} */
