function parseItems(items: any) {
  return items.map((item: any) => ({
    id: item.id,
    title: item.title,
    price: {
      currency: item.currency_id,
      amount: item.price,
      decimals: 2,
    },
    picture: item.thumbnail,
    condition: item.condition,
    free_shipping: item.shipping.free_shipping,
  }));
}

function getCategories(categories: any) {
  return categories.map((e: any) => e.name);
}

export {
  parseItems,
  getCategories,
};
