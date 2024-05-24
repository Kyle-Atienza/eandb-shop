import { ProductCard } from "@/components/products/card";

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
