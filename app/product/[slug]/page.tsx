import {
  parseProductListItemId,
  setInitalProductOptions,
  getSelectedOptions,
} from "@/utils/products";

import Image from "next/image";

import { Label } from "@/components/common/label";
import { Divider } from "@/components/decorations/divider";
import { ProductDetails } from "@/components/pages/product/details";

const getProduct = (productList: ProductListingItem[], slug: string) => {
  return productList.find(
    (listItem) => parseProductListItemId(listItem._id) === slug
  )!;
};

const getProductItem = (
  product: ProductListingItem,
  selectedOptions: string[]
) => {
  return product?.options.find((productOption: ProductItem) => {
    const productItemAttributes = productOption.attributes.map(
      (attribute) => attribute.value
    );

    return productItemAttributes.every(
      (value, index) => value === selectedOptions?.sort()[index]
    );
  });
};

const getProductList = async () => {
  const res = await fetch(`${process.env.BASE_URL}/products/list`);
  return await res.json();
};

export default async function Page({ params }: { params: { slug: string } }) {
  const productList: ProductListingItem[] = await getProductList();
  const product: ProductListingItem = getProduct(productList, params.slug);
  const selectedOptions: string[] = getSelectedOptions(
    setInitalProductOptions(product)!
  );
  const productItem: ProductItem = getProductItem(product, selectedOptions)!;

  return (
    <div className="md:flex gap-spaced mt-4 *:spaced-b">
      <div className="flex flex-col flex-1 h-[65vw] md:h-[calc(100vh-100px)] md:sticky md:top-[100px]">
        <div className="relative w-full h-full overflow-hidden rounded bg-light">
          {product?.details.gallery[0] ? (
            <Image
              src={product?.details.gallery[0]}
              fill
              alt={`${product.name} image`}
              objectFit="cover"
              priority
            />
          ) : null}
        </div>
      </div>
      <div className="flex flex-col flex-1 gap-spaced spaced-t lg:spaced-t-none">
        <div className="flex flex-col gap-spaced">
          <div className="flex gaps-spaced-sm">
            <div className="flex gap-spaced-sm">
              <div className="flex flex-col gap-spaced-sm">
                <h1 className="text-5xl text-light font-ranille">
                  {product?.name}
                </h1>
                <h2 className="flex items-baseline gap-2 text-3xl text-light font-ranille">
                  {productItem?.amount.toFixed(2)}
                  <span className="">
                    <Label>PHP</Label>
                  </span>
                </h2>
                <p className="text-md font-gopher text-light">
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed
                  do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                  Ut enim ad minim veniam, quis nostrud exercitation ullamco
                  laboris nisi ut aliquip ex ea commodo consequat. Duis aute
                  irure dolor in reprehenderit in voluptate velit esse cillum
                  dolore eu fugiat nulla pariatur. Excepteur sint occaecat
                  cupidatat non proident, sunt in culpa qui officia deserunt
                  mollit anim id est laborum.
                </p>
              </div>
            </div>
          </div>
          <div>
            <Divider />
          </div>
          <ProductDetails
            productList={productList}
            slug={params.slug}
            productItem={productItem}
            product={product}
          />
        </div>
      </div>
    </div>
  );
}
