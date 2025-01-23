import { Category, RawCategory } from "@/types/item";

export function mapRawCategoryToCategory(raw: RawCategory): Category {
    return {
        id: raw.id,
        name: raw.name,
    };
}
