import { Client, RawClient } from "./client";
import { Option } from "./form";

export interface Item {
    id: number;
    name: string;
    condition: "new" | "used" | "refurbished";
    stock: number;
    price: number; // we need float value
    slug: string; // correct?
    description: string; // correct?
    createdAt?: string;
    // soldAt?: string,
    owner: Client; // client id or object?
    brand: Brand | null; // brand id or object?
    pics?: string[]; // correct?
    categories?: Category[];
}

export interface RawItem {
    id: number;
    name: string;
    condition: "new" | "used" | "refurbished";
    count_in_stock: number;
    price: number; // we need float value
    slug: string; // correct?
    description: string; // correct?
    created_at?: Date;
    // soldAt?: Date,
    owner: RawClient; // client id or object?
    brand?: RawBrand; // brand id or object?
    pic?: string; // correct?
    pics?: string[]; // correct?
    categories: RawCategory[];
    total_categories?: number;
}

export interface ItemsTableProps {
    items: Item[];
}

export interface ItemFormData {
    name: string;
    condition: "new" | "used" | "refurbished";
    stock: number;
    price: number; // we need float value
    slug: string; // correct?
    description: string; // correct?
    // createdAt?: string;
    soldAt?: string;
    owner: Option | null;
    brand: Option | null; // brand id or object?
    categories: Option[];
    pics: (string | File)[]; // correct?
}
export interface ItemFormDataPartial {
    name: string;
    condition: "new" | "used" | "refurbished";
    stock: number;
    price: number; // we need float value
    slug: string; // correct?
    description: string; // correct?
}

export type ItemSummary = {
    id: number;
    name: string;
    price: number;
    stock: number;
    slug: string;
    description: string;
    condition: string;
    brand: {
        id: number;
        name: string;
    } | null;
    pic: string | null; // Single picture.
    totalCategories: number;
};

export interface CreateItemResponse {
    message: string;
    itemId?: number;
}

export interface Brand {
    id: number;
    name: string;
    createdAt?: string;
}

export interface RawBrand {
    id: number;
    name: string;
    created_at?: Date;
}

export interface Category {
    id: number;
    name: string;
    createdAt?: string;
}

export interface RawCategory {
    id: number;
    name: string;
    created_at?: Date;
}

export interface SearchBrandResponse {
    message: string;
    brands: Brand[];
}

export interface SearchCategoryResponse {
    message: string;
    categories: Category[];
}
