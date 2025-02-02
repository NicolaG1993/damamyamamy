export function mapRawShopPageToShopPage(rawShopItems) {
    return rawShopItems.map((rawItem) => ({
        name: rawItem.item_name,
        price: rawItem.price,
        slug: rawItem.slug,
        pic: rawItem.first_picture_url,
        brand: rawItem.brand.name,
    }));
}
