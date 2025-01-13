import { useState } from "react";
import styles from "./Form.module.css";
import { createUser } from "@/services/user";
import { handleAxiosError } from "@/utils/axiosUtils";
import InputCheckbox from "../inputs/InputCheckbox";
// import { useRouter } from "next/navigation";

export default function AddUserForm() {
    const [formData, setFormData] = useState({
        firstName: "",
        lastName: "",
        email: "",
        password: "",
        isAdmin: false,
    });
    const [error, setError] = useState<string | null>(null);
    // const router = useRouter();

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
            const response = await createUser(formData);
            console.log("response: ", response);

            if (response?.userId) {
                // 🧠 Todo: redirect somewhere? just restart form? success message? test
                // Right now the user is created but nothing happens
                // router.push(`/admin/users/${response.userId}`);
            } else {
                setError(response.message);
            }
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
            <div className={styles.inputWrap}>
                <input
                    type="password"
                    name="password"
                    placeholder="Password*"
                    value={formData.password}
                    onChange={handleChange}
                    required
                />
            </div>
            <div className={styles.inputWrap}>
                <InputCheckbox
                    name="isAdmin"
                    isChecked={formData.isAdmin}
                    onChange={handleChange}
                    label="Amministratore"
                />

                {/* <label className={styles.checkboxInput}>
                    Amministratore
                    <input
                        type="checkbox"
                        name="isAdmin"
                        checked={formData.isAdmin}
                        onChange={handleChange}
                    />
                </label> */}
            </div>

            <div className={styles.buttonWrap}>
                <button type="submit" className="secondary form-button">
                    Conferma
                </button>
            </div>
        </form>
    );
}
