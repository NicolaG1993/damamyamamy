import { RawBrand, Brand } from "@/types/item";

export function mapRawBrandToBrand(raw: RawBrand): Brand {
    return {
        id: raw.id,
        name: raw.name,
    };
}
