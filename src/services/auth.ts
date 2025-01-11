import { handleAxiosError } from "@/utils/axiosUtils";
import axios from "axios";

interface LoginFormData {
    email: string;
    password: string;
}

interface LoginResponse {
    message: string;
    token?: string;
}

export const adminLogin = async (
    formData: LoginFormData
): Promise<LoginResponse> => {
    try {
        const res = await axios.post("/api/auth/admin-login", formData);

        if (res.status === 200) {
            // Successful login
            console.log("Login effettuato con successo: ", res.data);
            return res.data;
        } else {
            // Handle unexpected status codes
            console.error("Unexpected error:", res);
            return { message: `Errore non previsto: ${res.data.message}` };
        }
    } catch (err) {
        // Use the error utility to handle the Axios error and pass a custom message
        const errorMessage = handleAxiosError(err);
        return { message: errorMessage };
    }
};

export const logout = async (): Promise<void> => {
    await axios.post("/api/auth/logout");
};
