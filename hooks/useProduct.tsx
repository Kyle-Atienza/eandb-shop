import {
  mapListingOptionsToItems,
  parseProductListItemId,
} from "@/utils/products";
import { revalidatePath } from "next/cache";

export async function useProduct(slug: string, variant?: string) {
  const getProductListingOptions = async () => {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_URL}/products/options/all`,
      { next: { revalidate: 10 } }
    );
    revalidatePath(`${process.env.NEXT_PUBLIC_BASE_URL}/products/list`);
    return await res.json();
  };

  const getProductPageItem = async () => {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_URL}/products/item/${slug}`,
      { next: { revalidate: 10 } }
    );
    return await res.json();
  };

  const productListingOptions: ProductListingOptions[] =
    await getProductListingOptions();
  const productPageItem: ProductPageItem = await getProductPageItem();
  const selectedVariant =
    productPageItem.variants.find((variantItem) =>
      variant ? variantItem.attribute._id === variant : variantItem.default
    ) || productPageItem.variants[0];

  const getRecommendations = (count: number = 4) => {
    const items: ProductListingItem[] = mapListingOptionsToItems(
      productListingOptions
    );

    const index = items.findIndex(
      (item) =>
        item.details._id === (selectedVariant?.details as unknown as string)
    );
    if (index === -1) return [];

    const result = [];
    let currentIndex = index + 1;

    while (result.length < count) {
      if (currentIndex >= items.length) currentIndex = 0;
      result.push(items[currentIndex++]);
    }

    return result;
  };

  const { ingredients, allergens, nutritionalFacts, awards } = productPageItem;
  const productDetails = {
    ingredients,
    allergens,
    nutritionalFacts,
    awards,
  };

  return {
    productPageItem,
    selectedVariant,
    productDetails,

    getRecommendations,
  };
}
