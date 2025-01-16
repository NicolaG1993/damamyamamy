export interface Item {
    id: number;
    name: string;
    brand: number; // brand id or object?
    categories: Category[];
    // tags: Tag[], // maybe i don't need
    owner: number; // client id or object?
    conditions: string;
    stock: number;
    price: number; // we need float value
    pics: string[]; // correct?
    slug?: string; // correct?
    description?: string; // correct?
    createdAt: string;
    // soldAt?: string,
}

export interface RawItem {
    id: number;
    name: string;
    brand: number; // brand id or object?
    categories: RawCategory[];
    // tags: RawTag[], // maybe i don't need
    owner: number; // client id or object?
    conditions: string;
    count_in_stock: number;
    price: number; // we need float value
    pics: string[]; // correct?
    slug?: string; // correct?
    description?: string; // correct?
    created_at: Date;
    // soldAt?: Date,
}

export interface ItemListProps {
    items: Item[];
}

export interface ItemFormData {
    name: string;
    brand: number; // brand id or object?
    categories: Category[];
    // tags: Tag[], // maybe i don't need
    owner: number; // client id or object?
    conditions: string;
    stock: number;
    price: number; // we need float value
    pics: string[]; // correct?
    slug?: string; // correct?
    description?: string; // correct?
    createdAt: string;
    // soldAt?: string,
}

export interface CreateItemResponse {
    message: string;
    itemId?: number;
}

export interface Brand {
    id: number;
    name: string;
    createdAt: string;
}

export interface RawBrand {
    id: number;
    name: string;
    created_at: Date;
}

export interface Category {
    id: number;
    name: string;
    createdAt: string;
}

export interface RawCategory {
    id: number;
    name: string;
    created_at: Date;
}

export interface Tag {
    id: number;
    name: string;
    createdAt: string;
}

export interface RawTag {
    id: number;
    name: string;
    created_at: Date;
}
