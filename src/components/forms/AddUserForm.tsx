import { useState } from "react";
import styles from "./Form.module.css";
import axios from "axios";

export default function AddUserForm() {
    const [formData, setFormData] = useState({
        firstName: "",
        lastName: "",
        email: "",
        password: "",
        isAdmin: false,
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value, type, checked } = e.target;
        setFormData({
            ...formData,
            [name]: type === "checkbox" ? checked : value,
        });
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        try {
            const res = await axios.post("/api/users/add", formData);

            if (res.status === 201) {
                alert(
                    `Utente creato con successo! User ID: ${res.data.userId}`
                );
            } else {
                alert(`Errore: ${res.data.message}`);
            }
        } catch (err) {
            if (axios.isAxiosError(err)) {
                console.error(
                    "Axios error:",
                    err.response?.data || err.message
                );
                alert(
                    `Errore: ${
                        err.response?.data.message || "Qualcosa é andato storto"
                    }`
                );
            } else {
                console.error("Unexpected error:", err);
                alert("Errore non previsto, contattare sviluppatore");
            }
        }
    };

    return (
        <form className={styles.form} onSubmit={handleSubmit}>
            <div className={styles.inputWrap}>
                <input
                    type="text"
                    name="firstName"
                    placeholder="First Name"
                    value={formData.firstName}
                    onChange={handleChange}
                    required
                />
            </div>
            <div className={styles.inputWrap}>
                <input
                    type="text"
                    name="lastName"
                    placeholder="Last Name"
                    value={formData.lastName}
                    onChange={handleChange}
                    required
                />
            </div>
            <div className={styles.inputWrap}>
                <input
                    type="email"
                    name="email"
                    placeholder="Email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                />
            </div>
            <div className={styles.inputWrap}>
                <input
                    type="password"
                    name="password"
                    placeholder="Password"
                    value={formData.password}
                    onChange={handleChange}
                    required
                />
            </div>
            <div className={styles.inputWrap}>
                <label>
                    Admin
                    <input
                        type="checkbox"
                        name="isAdmin"
                        checked={formData.isAdmin}
                        onChange={handleChange}
                    />
                </label>
            </div>
            <button type="submit">Add User</button>
        </form>
    );
}
