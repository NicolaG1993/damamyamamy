"use client";

import { useEffect, useState } from "react";
import UsersTable from "@/components/tables/UsersTable";
import { handleAxiosError } from "@/utils/axiosUtils";
import { getUsers } from "@/services/user";
import { User } from "@/types/user";
import Link from "next/link";

export default function UtentiRiservati() {
    const [users, setUsers] = useState<User[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const response = await getUsers();
                setUsers(response);
            } catch (err) {
                console.error("Users fetching failed:", err);
                setError(handleAxiosError(err));
            } finally {
                setIsLoading(false);
            }
        };
        fetchUsers();
    }, []);

    return (
        <div className="page">
            <main>
                <section>
                    <div>
                        <h1>Lista utenti autorizzati</h1>
                        <Link href={"/admin"} className="go-back">
                            Torna indietro
                        </Link>
                        {error ? (
                            <div className="error">{error}</div>
                        ) : isLoading ? (
                            <div className="loading">Caricamento...</div>
                        ) : users && !!users.length ? (
                            <UsersTable users={users} />
                        ) : (
                            <div className="error">Nessun risultato</div>
                        )}
                    </div>
                </section>
            </main>
        </div>
    );
}
