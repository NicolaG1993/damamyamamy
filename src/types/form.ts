export interface Option {
    id: number;
    name: string;
}

export interface RawOption {
    id: number;
    name: string;
}

export interface OptionResponse {
    // message: string;
    options: Option[];
}

export interface CreateOptionResponse {
    message: string;
    id?: number;
    name?: string;
}
