import { Label } from "@/components/common/label";
import { ProductCard } from "@/components/products/card";
import { parseProductListItemId } from "@/utils/products";

/* const getRelatedProducts = (
  productList: ProductListingItem[],
  product: ProductListingItem,
  slug: string
) => {
  return productList.filter(
    (listItem) =>
      listItem.details._id === product.details._id &&
      parseProductListItemId(listItem._id) !== slug
  )!;
};

const relatedProducts: ProductListingItem[] = getRelatedProducts(
  productList,
  product,
  slug
); */

export function ProductRelatedItems({
  items,
}: {
  items: ProductListingItem[];
}) {
  return (
    <>
      {items.length &&
        items.map((relatedProduct, index) => {
          return <ProductCard key={index} product={relatedProduct} />;
        })}
    </>
  );
}

{
  /* <>
  {items.length ? (
    <div className="flex flex-col gap-space-md">
      <Label>
        <span className="text-light">Related Products</span>
      </Label>
      <div className="grid grid-cols-2 gap-spaced-md">
        {items.length && items.map((relatedProduct, index) => {
          return <ProductCard key={index} product={relatedProduct} />;
        })}
      </div>
    </div>
  ) : null}
</> */
}
