import { RawItem, Item, ItemSummary, ItemFormData } from "@/types/item";
import { mapRawBrandToBrand } from "./mapRawBrandToBrand";
import { mapRawCategoryToCategory } from "./mapRawCategoryToCategory";
import {
    mapRawClientToClient,
    mapRawClientToOption,
} from "./mapRawClientToClient";

export function mapRawItemToItem(rawItem: RawItem): Item {
    return {
        id: rawItem.id,
        name: rawItem.name,
        price: parseFloat(rawItem.price),
        stock: rawItem.count_in_stock,
        slug: rawItem.slug,
        description: rawItem.description,
        condition: rawItem.condition,
        brand: rawItem.brand?.id ? mapRawBrandToBrand(rawItem.brand) : null,
        pics: rawItem.pics || [],
        categories: rawItem.categories
            ? rawItem.categories.map(mapRawCategoryToCategory)
            : [], // rawItem.categories || [],
        owner: mapRawClientToClient(rawItem.owner),
        // createdAt: rawItem.created_at,
    };
}

export function mapRawItemDetails(rawItem: RawItem): Item {
    const baseItem = mapRawItemToItem(rawItem);

    return {
        ...baseItem,
        pics: rawItem.pics || [],
        categories: rawItem.categories || [],
    };
}
export function mapRawItemSummary(rawItem: RawItem): ItemSummary {
    const baseItem = mapRawItemToItem(rawItem);

    return {
        ...baseItem,
        pic: rawItem.pic ? rawItem.pic[0] : null,
        totalCategories: rawItem.total_categories || 0,
    };
}

export function mapRawItemToItemFormData(rawItem: RawItem): ItemFormData {
    return {
        // id: rawItem.id,
        name: rawItem.name,
        price: parseFloat(rawItem.price),
        stock: rawItem.count_in_stock,
        slug: rawItem.slug,
        description: rawItem.description,
        condition: rawItem.condition,
        brand: rawItem.brand?.id ? mapRawBrandToBrand(rawItem.brand) : null,
        pics: rawItem.pics || [],
        categories: rawItem.categories
            ? rawItem.categories.map(mapRawCategoryToCategory)
            : [], // rawItem.categories || [],
        owner: mapRawClientToOption(rawItem.owner),
        // createdAt: rawItem.created_at,
    };
}
