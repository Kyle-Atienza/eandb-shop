import { parseProductListItemId } from "@/utils/products";
import { revalidatePath } from "next/cache";

export async function useProduct(slug: string, variant?: string) {
  const getProductOptions = async () => {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_URL}/products/options`,
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

  const productOptions: ProductOption[] = await getProductOptions();
  const productPageItem: ProductPageItem = await getProductPageItem();

  const ProductOption: ProductOptionSelect[] = [];

  const relatedItems = productOptions.filter(
    (listItem) =>
      listItem.details._id === productPageItem._id &&
      parseProductListItemId(listItem._id) !== slug
  );
  const categoryItems = productOptions.filter(
    (listItem) =>
      listItem.details.group === productPageItem.group &&
      listItem.details._id !== productPageItem._id
  )!;
  const otherItems = productOptions.filter((listItem) => {
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
  };
  const suggestedItems = [
    ...relatedItems,
    ...categoryItems,
    ...recommendedItems(),
  ].slice(0, 4);

  const { ingredients, allergens, nutritionalFacts, awards } = productPageItem;
  const productDetails = {
    ingredients,
    allergens,
    nutritionalFacts,
    awards,
  };

  return {
    productPageItem,
    // relatedItems,
    productDetails,
    suggestedItems,
    ProductOption,
  };
}
