import { useState } from "react";
import styles from "./Form.module.css";
import { handleAxiosError } from "@/utils/axiosUtils";
import { ClientFormData } from "@/types/client";

interface ClientFormProps {
    initialData?: ClientFormData;
    onSubmit: (data: ClientFormData) => Promise<void>;
    buttonText?: string;
}

export default function ClientForm({
    initialData = {
        firstName: "",
        lastName: "",
        email: "",
        phone: "",
        // address: "", // TODO: add column to db
        code: "",
    },
    onSubmit,
    buttonText = "Conferma",
}: ClientFormProps) {
    const [formData, setFormData] = useState<ClientFormData>(initialData);
    const [error, setError] = useState<string | null>(null);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError(null);

        try {
            await onSubmit(formData);
        } catch (err) {
            console.error("Client form submission failed:", err);
            setError(handleAxiosError(err as Error));
        }
    };

    return (
        <form className={styles.form} onSubmit={handleSubmit}>
            {error && (
                <div className={styles["server-error"]}>
                    <p>{error}</p>
                </div>
            )}

            <div className={styles.inputWrap}>
                <input
                    type="text"
                    name="firstName"
                    placeholder="Nome*"
                    value={formData.firstName}
                    onChange={handleChange}
                    required
                />
            </div>
            <div className={styles.inputWrap}>
                <input
                    type="text"
                    name="lastName"
                    placeholder="Cognome*"
                    value={formData.lastName}
                    onChange={handleChange}
                    required
                />
            </div>
            <div className={styles.inputWrap}>
                <input
                    type="email"
                    name="email"
                    placeholder="Email*"
                    value={formData.email}
                    onChange={handleChange}
                    required
                />
            </div>
            <div className={styles.inputWrap}>
                <input
                    type="tel"
                    name="phone"
                    placeholder="Telefono*"
                    value={formData.phone}
                    onChange={handleChange}
                    required
                />
            </div>

            {/* TODO: Autogenerate code, if missing in creation 🧠 on edit: if deleted, reuse previous one - if new code use new code */}
            <div className={styles.inputWrap}>
                <input
                    type="text"
                    name="code"
                    placeholder="Codice personale*"
                    value={formData.code}
                    onChange={handleChange}
                    required
                />
            </div>

            <div className={styles.buttonWrap}>
                <button type="submit" className="secondary form-button">
                    {buttonText}
                </button>
            </div>
        </form>
    );
}
