import { Label } from "@/components/common/label";
import { ProductCard } from "@/components/products/card";

export function ProductRelatedItems({
  items,
}: {
  items: ProductListingItem[];
}) {
  console.log(items);

  return (
    <>
      {items.length ? (
        <>
          <div className="flex flex-col gap-space-md">
            <Label>
              <span className="text-light">Related Products</span>
            </Label>
            <div className="grid grid-cols-2 gap-spaced-md">
              {items.map((relatedProduct, index) => {
                return <ProductCard key={index} product={relatedProduct} />;
              })}
            </div>
          </div>
        </>
      ) : null}
    </>
  );
}
