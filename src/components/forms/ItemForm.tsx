import { useState } from "react";
import styles from "./Form.module.css";
import { handleAxiosError } from "@/utils/axiosUtils";
import { ItemFormData } from "@/types/item";

interface ItemFormProps {
    initialData?: ItemFormData;
    onSubmit: (data: ItemFormData) => Promise<void>;
    buttonText?: string;
}

export default function ItemForm({
    initialData = {
        title: "",
        brand: "",
        categories: "",
        // tags: "", // maybe i don't need
        owner: "", // client object or id?
        conditions: "",
        stock: 1,
        price: 0, // we need float value
        pics: [],
        createdAt: "",
        // soldAt: "", // we could add a date when admin confirm the product was sold (not available on creation phase, but a separate button on item page)
    },
    onSubmit,
    buttonText = "Conferma",
}: ItemFormProps) {
    const [formData, setFormData] = useState<ItemFormData>(initialData);
    const [error, setError] = useState<string | null>(null);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value, type, checked } = e.target;
        setFormData({
            ...formData,
            [name]: type === "checkbox" ? checked : value, // we dont use  in this form
        });
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError(null);

        try {
            await onSubmit(formData);
        } catch (err) {
            console.error("Login failed:", err);
            setError(handleAxiosError(err));
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
                    name="title"
                    placeholder="Nome*"
                    value={formData.title}
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
