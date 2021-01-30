export function parseItems(items: any) {
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

export function getCategories(items: any) {
  return items.map((item: any) => item.category_id);
}
