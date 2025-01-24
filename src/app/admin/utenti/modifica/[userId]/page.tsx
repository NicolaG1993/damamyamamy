import UserForm from "@/components/forms/UserForm";
import { getUser, editUser } from "@/services/user";
import { UserFormData, User } from "@/types/user";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function ModificaUtente({
    params,
}: {
    params: { userId: number };
}) {
    const { userId } = params;
    const router = useRouter();
    const [user, setUser] = useState<UserFormData | null>(null);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const loadUser = async () => {
            try {
                const data: User = await getUser(userId);
                setUser({
                    firstName: data.firstName,
                    lastName: data.lastName,
                    email: data.email,
                    password: "", // Password isn't fetched, left blank for security
                    isAdmin: data.isAdmin,
                });
            } catch (err) {
                console.error("Error fetching user:", err);
                setError("Failed to load user data.");
            } finally {
                setIsLoading(false);
            }
        };
        loadUser();
    }, [userId]);

    const handleEditUser = async (formData: UserFormData) => {
        try {
            await editUser(userId, formData);
            router.push(`/admin/users`);
        } catch (err) {
            console.error("Error updating user:", err);
            setError("Failed to update user.");
        }
    };

    return (
        <div className="page">
            <main>
                <section>
                    <div>
                        <h1>Modifica utente</h1>
                        <Link href={"/admin"} className="go-back">
                            Torna indietro
                        </Link>
                        {error ? (
                            <div className="error">{error}</div>
                        ) : isLoading ? (
                            <div className="loading">Caricamento...</div>
                        ) : user ? (
                            <UserForm
                                initialData={user}
                                onSubmit={handleEditUser}
                                buttonText="Salva modifiche"
                                hidePassword
                            />
                        ) : (
                            <div className="error">Utente non trovato</div>
                        )}
                    </div>
                </section>
            </main>
        </div>
    );
}
