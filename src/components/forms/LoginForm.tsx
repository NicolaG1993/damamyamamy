import { useState } from "react";
import styles from "./Form.module.css";
import { adminLogin } from "@/services/auth";
import { useRouter } from "next/navigation";
import { handleAxiosError } from "@/utils/axiosUtils";

export default function LoginForm() {
    const [formData, setFormData] = useState({
        email: "",
        password: "",
    });
    const [error, setError] = useState<string | null>(null);
    const router = useRouter();

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        try {
            const response = await adminLogin(formData);
            console.log("adminLogin response: ", response);

            if (response.token) {
                // If login is successful, redirect to /admin
                router.push(`/admin`);
            } else {
                // Handle failed login response
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
            <div className={styles.buttonWrap}>
                <button type="submit" className="primary form-button">
                    Login
                </button>
            </div>
        </form>
    );
}
