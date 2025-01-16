"use client";

import UserForm from "@/components/forms/UserForm";
import { createUser } from "@/services/user";
import { UserFormData, CreateUserResponse } from "@/types/user";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function CreaUtente() {
    const router = useRouter();

    const handleAddUser = async (formData: UserFormData) => {
        const response: CreateUserResponse = await createUser(formData);
        if (response?.userId) {
            router.push(`/admin/utenti`);
        } else {
            throw new Error(response.message || "Failed to create user");
        }
    };

    return (
        <div className="page">
            <main>
                <section>
                    <div>
                        <h1>Crea nuovo utente</h1>
                        <Link href={"/admin"} className="go-back">
                            Torna indietro
                        </Link>
                        <UserForm onSubmit={handleAddUser} buttonText="Crea" />
                    </div>
                </section>
            </main>
        </div>
    );
}
