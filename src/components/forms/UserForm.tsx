import { useState } from "react";
import styles from "./Form.module.css";
import { handleAxiosError } from "@/utils/axiosUtils";
import InputCheckbox from "../inputs/InputCheckbox";
import { AddUserFormData } from "@/types/user";

interface UserFormProps {
    initialData?: AddUserFormData; // For adding or editing users
    onSubmit: (data: AddUserFormData) => Promise<void>;
    buttonText?: string;
    hidePassword?: boolean; // To hide password field for edit
}

export default function UserForm({
    initialData = {
        firstName: "",
        lastName: "",
        email: "",
        password: "",
        isAdmin: false,
    },
    onSubmit,
    buttonText = "Submit",
    hidePassword = false,
}: UserFormProps) {
    const [formData, setFormData] = useState<AddUserFormData>(initialData);
    const [error, setError] = useState<string | null>(null);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value, type, checked } = e.target;
        setFormData({
            ...formData,
            [name]: type === "checkbox" ? checked : value,
        });
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError(null);

        try {
            await onSubmit(formData);
            // const response = await onSubmit(formData); // const response = await createUser(formData);
            // console.log("response: ", response);

            // if (response?.userId) {
            // router.push(`/admin/users`); // router.push(`/admin/users/${response.userId}`);
            // } else {
            // setError(response.message);
            // }
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
            {!hidePassword && (
                <div className={styles.inputWrap}>
                    <input
                        type="password"
                        name="password"
                        placeholder="Password*"
                        value={formData.password}
                        onChange={handleChange}
                        required={!hidePassword}
                    />
                </div>
            )}
            <div className={styles.inputWrap}>
                <InputCheckbox
                    name="isAdmin"
                    isChecked={formData.isAdmin}
                    onChange={handleChange}
                    label="Amministratore"
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
