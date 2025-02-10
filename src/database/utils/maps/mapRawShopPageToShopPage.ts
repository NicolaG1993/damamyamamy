import { RawShopItemPreview } from "@/types/shop";

export function mapRawShopPageToShopPage(rawShopItems: RawShopItemPreview[]) {
    return rawShopItems.map((rawItem) => ({
        name: rawItem.item_name,
        price: rawItem.price,
        slug: rawItem.slug,
        pic: rawItem.first_picture_url,
        brand: rawItem.brand.name,
    }));
}
