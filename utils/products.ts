const parseProductListItemId = (_id: string) => {
  return _id.toLowerCase().replaceAll(" ", "-");
};

const mapListingOptionsToItems = (
  productListingOptions: ProductListingOptions[]
) => {
  return productListingOptions.reduce(
    (items: ProductListingItem[], productListItem) => {
      let productListItemOptions: ProductListingItem[] = [];
      productListItem.options.forEach((option) => {
        productListItemOptions.push({
          ...option,
          _id: productListItem._id,
          details: productListItem.details,
        });
      });
      return items.concat(productListItemOptions);
    },
    []
  );
};

export { parseProductListItemId, mapListingOptionsToItems };
