import { Brand, Category, RawBrand, RawCategory } from "./item";

export interface ShopPageFilters {
    page: number;
    countPerPage: number;
    brand?: string;
    maxPrice?: number;
    minPrice?: number;
    category?: string;
    search?: string;
    order?: "ASC" | "DESC";
}

export interface ShopPageResponse {
    items: ShopItemPreview[];
    total: number;
}

export interface ShopItem {
    name: string;
    condition: "Nuovo" | "Usato" | "Rigenerato";
    stock: number;
    price: number; // we need float value
    slug: string; // correct?
    description: string; // correct?
    // soldAt?: string;
    brand: Brand | null; // brand id or object?
    pics: string[]; // correct?
    categories: Category[];
}

export interface RawShopItem {
    item_name: string;
    condition: "new" | "used" | "refurbished";
    count_in_stock: number;
    price: string; // we need float value
    slug: string;
    description: string;
    // sold_at?: Date;
    brand?: RawBrand;
    pics: string[];
    categories: RawCategory[];
    // total_categories?: number;
}

export interface ShopItemPreview {
    slug: string;
    name: string;
    price: number;
    pic: string;
    // sold_at?: Date;
}

export interface RawShopItemPreview {
    slug: string;
    name: string;
    price: number;
    pic: string;
    // sold_at?: Date;
}

export interface ShopFiltersData {
    brands: string[];
    categories: string[];
}
