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
    price: number;
    // slug: string;
    description: string;
    createdAt: string;
    soldAt?: string;
    pics: string[];
    brand: string;
    categories: string[];
}

export interface RawShopItem {
    name: string;
    condition: "new" | "used" | "refurbished";
    count_in_stock: number;
    price: string;
    // slug: string;
    description: string;
    created_at: Date;
    sold_at?: Date;
    pictures: string[];
    brand_name?: string;
    categories: string[];
    // total_categories?: number;
}

export interface RawShopRelation {
    name: string;
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
