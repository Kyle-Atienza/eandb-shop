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
  const selectedVariant = productPageItem.variants.find((variantItem) =>
    variant ? variantItem.attribute._id === variant : variantItem.default
  );

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

  /* const relatedItems = productListingOptions.filter(
    (listItem) =>
      listItem.details._id === productPageItem._id &&
      parseProductListItemId(listItem._id) !== slug
  );
  const categoryItems = productListingOptions.filter(
    (listItem) =>
      listItem.details.group === productPageItem.group &&
      listItem.details._id !== productPageItem._id
  )!;
  const otherItems = productListingOptions.filter((listItem) => {
    return (
      ![...relatedItems, ...categoryItems].some(
        (item) => item.details._id === listItem.details._id
      ) && listItem.details._id !== productPageItem._id
    );
  });
  const recommendedItems = () => {
    const randomElements = [];

    for (let i = 0; i < 4; i++) {
      const randomIndex = Math.floor(Math.random() * otherItems.length);

      randomElements.push(otherItems.splice(randomIndex, 1)[0]);
    }

    return randomElements;
  }; */
  /* const suggestedItems = [
    ...relatedItems,
    ...categoryItems,
    ...recommendedItems(),
  ].slice(0, 4); */

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
    // relatedItems,
    productDetails,
    // suggestedItems,

    getRecommendations,
  };
}
