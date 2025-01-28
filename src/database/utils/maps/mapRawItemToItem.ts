import {
    RawItem,
    Item,
    ItemSummary,
    ItemFormData,
    ItemsTableProps,
    RawItemTableProps,
} from "@/types/item";
import { mapRawBrandToBrand } from "./mapRawBrandToBrand";
import { mapRawCategoryToCategory } from "./mapRawCategoryToCategory";
import { mapRawClientToClient } from "./mapRawClientToClient";
import { mapRawClientToOption } from "./mapRawClientToOption";

export function mapRawItemToItem(rawItem: RawItem): Item {
    console.log("rawItem: ", rawItem);
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

export function mapRawItemsToItems(
    rawItems: RawItemTableProps[]
): ItemsTableProps[] {
    return rawItems.map((rawItem) => ({
        id: rawItem.item_id,
        name: rawItem.item_name,
        price: parseFloat(rawItem.price),
        stock: rawItem.count_in_stock,
        slug: rawItem.slug,
        description: rawItem.description,
        condition: rawItem.condition,
        createdAt: rawItem.created_at,
        brand: rawItem.brand_id
            ? {
                  id: rawItem.brand_id,
                  name: rawItem.brand_name,
              }
            : null,
        totalCategories: rawItem.total_categories,
        owner: rawItem.client_id
            ? {
                  id: rawItem.client_id,
                  name: rawItem.client_name,
              }
            : null,
        pic: rawItem.first_picture_url || "",
    }));
}
