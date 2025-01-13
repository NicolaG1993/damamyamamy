export interface User {
    id: number;
    firstName: string;
    lastName: string;
    email: string;
    isAdmin: boolean;
    createdAt: string;
}

export interface RawUser {
    id: number;
    first_name: string;
    last_name: string;
    email: string;
    psw?: string;
    hashed_password?: string;
    is_admin: boolean;
    created_at: Date;
}

export interface UserListProps {
    users: User[];
}

export interface AddUserFormData {
    firstName: string;
    lastName: string;
    email: string;
    password: string;
    isAdmin: boolean;
}

export interface CreateUserResponse {
    message: string;
    userId?: string;
}
