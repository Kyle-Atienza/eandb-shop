import { parseProductListItemId } from "@/utils/products";
import { revalidatePath } from "next/cache";

export async function useProduct(slug: string, variant?: string) {
  /* const getProduct = (productList: ProductListingItem[], slug: string) => {
    return productList.find(
      (listItem) => parseProductListItemId(listItem._id) === slug
    )!;
  }; */

  const getProductList = async () => {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_URL}/products/list`,
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

  const productList: ProductListingItem[] = await getProductList();
  // const product: ProductListingItem = getProduct(productList, slug);
  const productPageItem: ProductPageItem = await getProductPageItem();
  /* const productOptions: ProductOptionSelect[] = productPageItem?.variants?.map(
    (variant) => ({
      ...variant,
      selected: false,
    })
  ); */
  const productOptions: ProductOptionSelect[] = [];

  /* const relatedItems = productList.filter(
    (listItem) =>
      listItem.details._id === product.details._id &&
      parseProductListItemId(listItem._id) !== slug
  );
  const categoryItems = productList.filter(
    (listItem) =>
      listItem.details.group === product.details.group &&
      listItem.details._id !== product.details._id
  )!;
  const otherItems = productList.filter((listItem) => {
    return (
      ![...relatedItems, ...categoryItems].some(
        (item) => item.details._id === listItem.details._id
      ) && listItem.details._id !== product.details._id
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
  ].slice(0, 4); */

  const suggestedItems: ProductListingItem[] = [];

  /* const { ingredients, allergens, nutritionalFacts, awards } =
    productPageItem.details; */
  const productDetails = {
    ingredients: [],
    allergens: [],
    nutritionalFacts: [],
    awards: [],
  };

  return {
    productPageItem,
    // relatedItems,
    productDetails,
    suggestedItems,
    productOptions,
  };
}
