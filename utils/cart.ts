const getCartItemData = (items: ProductItem[], cartItemId: string) => {
  return items.find((item) => item._id === cartItemId);
};

export { getCartItemData };
