import { UserFormData, CreateUserResponse, User } from "@/types/user";
import { handleAxiosError } from "@/utils/axiosUtils";
import axios from "axios";

export const createUser = async (
    formData: UserFormData
): Promise<CreateUserResponse> => {
    try {
        const res = await axios.post("/api/users/add", formData);

        if (res.status === 201) {
            // Successful response
            console.log(`Utente creato con successo!: ${res.data}`);
            return res.data;
        } else {
            // Handle unexpected status codes
            console.error("Unexpected error:", res.data);
            return { message: `Errore: ${res.data.message}` };
        }
    } catch (err) {
        // Use the error utility to handle the Axios error and pass a custom message
        const errorMessage = handleAxiosError(err);
        return { message: errorMessage };
    }
};

export const editUser = async (
    userId: number,
    updatedData: UserFormData
): Promise<CreateUserResponse> => {
    try {
        const res = await axios.put(`/api/users/${userId}`, updatedData);

        if (res.status === 200) {
            return res.data;
        } else {
            console.error("Unexpected status code:", res.data);
            throw new Error(res.data.message || "Errore sconosciuto.");
        }
    } catch (err) {
        throw new Error(handleAxiosError(err));
    }
};

export const getUser = async (userId: number): Promise<User> => {
    try {
        const res = await axios.get(`/api/users/${userId}`);

        if (res.status === 200) {
            return res.data.user;
        } else {
            console.error("Unexpected status code:", res.data);
            throw new Error(res.data.message || "Errore sconosciuto.");
        }
    } catch (err) {
        throw new Error(handleAxiosError(err));
    }
};

export const getUsers = async (): Promise<User[]> => {
    try {
        const res = await axios.get("/api/users");

        if (res.status === 200) {
            return res.data.users;
        } else {
            console.error("Unexpected status code:", res.data);
            throw new Error(res.data.message || "Errore sconosciuto.");
        }
    } catch (err) {
        throw new Error(handleAxiosError(err));
    }
};
