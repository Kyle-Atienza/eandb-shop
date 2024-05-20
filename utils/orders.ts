const getCartItemsAmount = (items: CartItem[]) => {
  return items.reduce((total, cartItem) => {
    // total += cartItem.count * cartItem.price;
    return total;
  }, 0);
};

export { getCartItemsAmount };
