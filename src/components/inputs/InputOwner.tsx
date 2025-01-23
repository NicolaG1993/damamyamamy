import { useEffect, useState } from "react";
import axios from "axios";
import styles from "./InputOwner.module.css";
import { Option } from "@/types/form";

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
                const response = await axios.get<Option[]>("/api/clients");
                setClients(response.data);
            } catch (err) {
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
        <div className={styles.container}>
            <label>Proprietario</label>
            <select
                value={selectedOwner?.name || ""}
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
        </div>
    );
}
