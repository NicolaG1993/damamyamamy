import { Client, ClientFormData, CreateClientResponse } from "@/types/client";
import { handleAxiosError } from "@/utils/axiosUtils";
import axios from "axios";

export const createClient = async (
    formData: ClientFormData
): Promise<CreateClientResponse> => {
    try {
        const res = await axios.post("/api/clients/add", formData);

        if (res.status === 201) {
            // Successful response
            console.log(`Cliente creato con successo!: ${res.data}`);
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

export const editClient = async (
    clientId: number,
    updatedData: ClientFormData
): Promise<CreateClientResponse> => {
    try {
        const res = await axios.put(`/api/clients/${clientId}`, updatedData);

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

// TODO: retrieve related items 👇🧠
export const getClient = async (clientId: number): Promise<Client> => {
    try {
        const res = await axios.get(`/api/clients/${clientId}`);

        if (res.status === 200) {
            return res.data.client;
        } else {
            console.error("Unexpected status code:", res.data);
            throw new Error(res.data.message || "Errore sconosciuto.");
        }
    } catch (err) {
        throw new Error(handleAxiosError(err));
    }
};

export const getClients = async (): Promise<Client[]> => {
    try {
        const res = await axios.get("/api/clients");

        if (res.status === 200) {
            return res.data.clients;
        } else {
            console.error("Unexpected status code:", res.data);
            throw new Error(res.data.message || "Errore sconosciuto.");
        }
    } catch (err) {
        throw new Error(handleAxiosError(err));
    }
};
