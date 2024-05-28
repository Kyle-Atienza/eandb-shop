import { parseProductListItemId } from "@/utils/products";
import { revalidatePath } from "next/cache";

export async function useProduct(slug: string) {
  const getProduct = (productList: ProductListingItem[], slug: string) => {
    return productList.find(
      (listItem) => parseProductListItemId(listItem._id) === slug
    )!;
  };

  const getProductList = async () => {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_URL}/products/list`,
      { next: { revalidate: 10 } }
    );
    revalidatePath(`${process.env.NEXT_PUBLIC_BASE_URL}/products/list`);
    return await res.json();
  };

  const getProductItem = async () => {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_URL}/products/item/`,
      { next: { revalidate: 10 } }
    );
    return await res.json();
  };

  const productList: ProductListingItem[] = await getProductList();
  const product: ProductListingItem = getProduct(productList, slug);
  const relatedItems = productList.filter(
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
  const productOptions: ProductOptionSelect[] = product.options.map(
    (option) => ({
      ...option,
      selected: false,
    })
  );

  console.log("debugs", productOptions);

  const suggestedItems = [
    ...relatedItems,
    ...categoryItems,
    ...recommendedItems(),
  ].slice(0, 4);

  const { ingredients, allergens, nutritionalFacts, awards } = product.details;
  const productDetails = { ingredients, allergens, nutritionalFacts, awards };

  return {
    product,
    relatedItems,
    productDetails,
    suggestedItems,
    productOptions,
  };
}
