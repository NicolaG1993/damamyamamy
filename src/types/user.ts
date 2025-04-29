export interface User {
    id: number;
    firstName: string;
    lastName: string;
    email: string;
    isAdmin: boolean;
    createdAt: string;
}

export interface UserFormData {
    firstName: string;
    lastName: string;
    email: string;
    isAdmin: boolean;
    password?: string;
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

export interface RawUserFormData {
    first_name: string;
    last_name: string;
    email: string;
    is_admin: boolean;
}

export interface UserListProps {
    users: User[];
}

export interface CreateUserResponse {
    message: string;
    userId?: number;
}

export interface UsersTableProps {
    users: User[];
    isLoading: boolean;
}

//
