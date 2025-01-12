import { handleAxiosError } from "@/utils/axiosUtils";
import axios from "axios";

interface AddUserFormData {
    firstName: string;
    lastName: string;
    email: string;
    password: string;
    isAdmin: boolean;
}

interface CreateUserResponse {
    message: string;
    userId?: string;
}

export const createUser = async (
    formData: AddUserFormData
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
