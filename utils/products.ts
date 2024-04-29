const parseProductListItemId = (_id: string) => {
  return _id.toLowerCase().replaceAll(" ", "-");
};

const setInitalProductOptions = (
  product: ProductListingItem
): ProductOptionSelectItem[] => {
  return product?.options.reduce(
    (options: ProductOptionSelectItem[], option, index) => {
      option.attributes.forEach((optionListItem) => {
        const { type } = optionListItem;
        const optionValue = {
          ...optionListItem,
          _id: option._id,
          selected: !index,
        };
        const existingOption = options.find(
          (opt: ProductOptionSelectItem) => opt.name === type
        );

        if (!existingOption) {
          options.push({
            name: type,
            options: [optionValue],
          });
        } else {
          existingOption.options.push(optionValue);
        }
      });

      return options;
    },
    []
  );
};

export { parseProductListItemId, setInitalProductOptions };
