import { RawUser, User } from "@/types/user";

export const mapRawUsersToUsers = (rawUsers: RawUser[]): User[] => {
    return rawUsers.map((user) => ({
        id: user.id,
        firstName: user.first_name,
        lastName: user.last_name,
        email: user.email,
        isAdmin: user.is_admin,
        createdAt: user.created_at.toISOString(),
    }));
};
