import { RawShopItem, ShopItem } from "@/types/shop";
import { mapRawItemCondition } from "./mapRawItemToItem";

export function mapRawShopItemToShopItem(rawItem: RawShopItem): ShopItem {
    return {
        name: rawItem.name,
        price: parseFloat(rawItem.price),
        stock: rawItem.count_in_stock,
        description: rawItem.description,
        condition: mapRawItemCondition(rawItem.condition),
        brand: rawItem.brand_name || "",
        pics: rawItem.pictures,
        categories: rawItem.categories,
        createdAt: new Date(rawItem.created_at).toLocaleDateString(),
        soldAt: rawItem.sold_at
            ? new Date(rawItem.sold_at).toLocaleDateString()
            : undefined,
    };
}
