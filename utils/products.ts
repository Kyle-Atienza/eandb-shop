const parseProductListItemId = (_id: string) => {
  return _id.toLowerCase().replaceAll(" ", "-");
};

export { parseProductListItemId };
