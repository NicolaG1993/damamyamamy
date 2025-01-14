import { RawUser, User } from "@/types/user";

export const mapRawUserToUser = (rawUser: RawUser): User => {
    return {
        id: rawUser.id,
        firstName: rawUser.first_name,
        lastName: rawUser.last_name,
        email: rawUser.email,
        isAdmin: rawUser.is_admin,
        createdAt: rawUser.created_at.toISOString(),
    };
};
