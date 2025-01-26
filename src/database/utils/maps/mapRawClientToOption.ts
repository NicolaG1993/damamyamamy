import { RawClientPartial } from "@/types/client";
import { Option } from "@/types/form";

export const mapRawClientToOption = (rawClient: RawClientPartial): Option => {
    return {
        id: rawClient.id,
        name: `${rawClient.last_name}, ${rawClient.first_name}`,
    };
};
