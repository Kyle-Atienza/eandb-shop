import { Label } from "@/components/common/label";
import { ProductCard } from "@/components/products/card";

export function ProductRelatedItems({
  items,
}: {
  items: ProductListingItem[];
}) {
  return (
    <>
      {items.length ? (
        <>
          <div className="text-light flex flex-col gap-space-md">
            <Label>Related Products</Label>
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
