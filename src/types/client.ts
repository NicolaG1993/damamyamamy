import { ItemPreview, RawItemPreview } from "./item";

export interface Client {
    id: number;
    firstName: string;
    lastName: string;
    email?: string;
    phone?: string;
    // address?: string
    code: string;
    items?: ItemPreview[];
    createdAt: string;
}

export interface ClientPreview {
    id: number;
    name: string;
}

export interface RawClient {
    id: number;
    first_name: string;
    last_name: string;
    email: string;
    phone?: string;
    // address?: string;
    personal_code: string;
    items: RawItemPreview[];
    created_at: Date;
}

export interface ClientFormData {
    firstName: string;
    lastName: string;
    email?: string;
    phone?: string;
    // address?: string
    code: string;
    // items: Item[];
}
export interface RawClientFormData {
    first_name: string;
    last_name: string;
    email?: string;
    phone?: string;
    // address?: string
    personal_code: string;
    // items: Item[];
}
export interface RawClientPartial {
    id: number;
    first_name: string;
    last_name: string;
}

export interface RawClientPreview {
    id: number;
    name: string;
}

export interface ClientListProps {
    clients: Client[];
}

export interface CreateClientResponse {
    message: string;
    clientId?: string;
}

export interface ClientsTableProps {
    clients: Client[];
}
