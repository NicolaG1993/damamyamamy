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
