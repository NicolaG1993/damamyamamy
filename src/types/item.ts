import { ClientPreview, RawClientPartial, RawClientPreview } from "./client";
import { Option } from "./form";

export interface Item {
    id: number;
    name: string;
    condition: "Nuovo" | "Usato" | "Rigenerato";
    stock: number;
    price: number; // we need float value
    slug: string; // correct?
    description: string; // correct?
    createdAt?: string;
    soldAt?: string;
    owner: ClientPreview; // client id or object?
    brand: Brand | null; // brand id or object?
    pics?: string[]; // correct?
    categories?: Category[];
}

export interface ItemPreview {
    id: number;
    name: string;
    price: number;
    pic: string;
    soldAt?: string;
}

export interface RawItem {
    item_id: number;
    item_name: string;
    condition: "new" | "used" | "refurbished";
    count_in_stock: number;
    price: string; // we need float value
    slug: string;
    description: string;
    created_at?: Date;
    sold_at?: Date;
    owner: RawClientPreview;
    brand?: RawBrand; // brand id or object?
    pic?: string; // correct?
    pics?: string[]; // correct?
    categories: RawCategory[];
    total_categories?: number;
}

export interface RawItemPreview {
    id: number;
    name: string;
    price: number;
    pic: string;
    sold_at?: Date;
}

export interface ItemsTableProps {
    items: ItemsTableRow[];
}

export interface ItemsTableRow {
    id: number; // The ID of the item
    name: string; // The name of the item
    price: number; // The price of the item
    stock: number; // The count of items in stock
    slug: string; // The slug for the item
    description: string; // A detailed description of the item
    condition: string; // The condition of the item (e.g., "new", "used")
    brand: {
        id: number; // The ID of the brand
        name: string; // The name of the brand
    } | null; // Null if no brand is associated
    totalCategories: number; // The total number of categories the item belongs to
    owner: {
        id: number; // The ID of the client who owns the item
        name: string; // The name of the client, formatted as "LastName, FirstName"
    }; // Null if no owner is associated
    pic: string; // An array of picture URLs associated with the item
    createdAt: Date;
}

export interface RawItemTableRow {
    item_id: number; // The ID of the item
    item_name: string; // The name of the item
    price: string; // The price of the item (as a string from the database)
    count_in_stock: number; // The stock count of the item
    slug: string; // The slug for the item
    description: string; // A detailed description of the item
    condition: string; // The condition of the item (e.g., "new", "used")
    client_id: number; // The ID of the client owning the item
    client_name: string; // The full name of the client, formatted as "FirstName LastName"
    first_picture_url: string | null; // URL for the first picture (if available)
    brand_id: number; // The ID of the brand associated with the item
    brand_name: string; // The name of the brand associated with the item
    total_categories: number; // The total count of categories linked to the item
    created_at: Date;
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

export interface RawItemFormData {
    item_name: string;
    condition: "new" | "used" | "refurbished";
    count_in_stock: number;
    price: string; // we need float value
    slug: string; // correct?
    description: string; // correct?
    soldAt?: string;
    owner: RawClientPartial;
    brand: RawBrand | null; // brand id or object?
    categories: RawCategory[];
    pics: string[]; // correct?
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
