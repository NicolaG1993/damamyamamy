import { useEffect, useState } from "react";
import styles from "./InputOwner.module.css";
import { Option } from "@/types/form";
import { getClientOptions } from "@/services/client";

interface InputOwnerProps {
    selectedOwner: Option | null;
    onSelectOwner: (owner: Option) => void;
}

export default function InputOwner({
    selectedOwner,
    onSelectOwner,
}: InputOwnerProps) {
    const [clients, setClients] = useState<Option[]>([]);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchClients = async () => {
            try {
                const response: Option[] = await getClientOptions();
                setClients(response);
            } catch (err) {
                console.error("Error: ", err);
                setError("Failed to load clients.");
            }
        };

        fetchClients();
    }, []);

    const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const selectedClientId = Number(e.target.value);
        const selectedClient = clients.find(
            (client) => client.id === selectedClientId
        );
        if (selectedClient) {
            onSelectOwner(selectedClient);
        }
    };

    return (
        <>
            <select
                value={selectedOwner?.id || ""}
                onChange={handleChange}
                required
            >
                <option value="" disabled>
                    Seleziona cliente
                </option>
                {clients.map((client) => (
                    <option key={client.id} value={client.id}>
                        {client.name}
                    </option>
                ))}
            </select>
            {error && <p className={styles.error}>{error}</p>}
        </>
    );
}
