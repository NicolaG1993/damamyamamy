import { Item, RawItem } from "./item";

export interface Client {
    id: number;
    firstName: string;
    lastName: string;
    email?: string;
    phone?: string;
    // address?: string
    code: string;
    items?: Item[];
    createdAt: string;
}

export interface RawClient {
    id: number;
    first_name: string;
    last_name: string;
    email: string;
    phone?: string;
    // address?: string;
    personal_code: string;
    items: RawItem[];
    created_at: Date;
}

export interface ClientListProps {
    clients: Client[];
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

export interface CreateClientResponse {
    message: string;
    clientId?: string;
}

export interface ClientsTableProps {
    clients: Client[];
}
