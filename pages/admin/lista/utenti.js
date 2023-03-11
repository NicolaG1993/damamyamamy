import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import axios from "axios";
import { shallowEqual, useSelector } from "react-redux";

import { selectUserState } from "@/redux/slices/userSlice";
import { checkUser } from "@/utils/custom/checks";
import { getError } from "@/utils/error";
import Link from "next/link";

export default function Utenti() {
    const router = useRouter();
    let userInfo = useSelector(selectUserState, shallowEqual);
    const [isAdmin, setIsAdmin] = useState(false);
    const [users, setUsers] = useState();

    useEffect(() => {
        setIsAdmin(false);
        handleAuth(userInfo);
    }, [userInfo]);

    useEffect(() => {
        isAdmin && fetchData();
    }, [isAdmin]);

    const handleAuth = async () => {
        let res = await checkUser(userInfo);
        if (res) {
            setIsAdmin(true);
        } else {
            router.push("/");
        }
    };

    const fetchData = async () => {
        try {
            const { data } = await axios.get("/api/admin/all-users", {
                headers: { authorization: `Bearer ${userInfo.token}` },
            });
            setUsers(data);
        } catch (err) {
            setUsers();
            alert(getError(err));
        }
    };

    return (
        <main>
            <section className="page">
                <h1>Tutti gli utenti</h1>
                <Link href={"/admin"} className="back-link">
                    Torna indietro
                </Link>
                <div className="list" id="UsersList">
                    {isAdmin ? (
                        users && users.length ? (
                            <>
                                <div className="listHead">
                                    <p>ID</p>
                                    <p>Nome</p>
                                    <p>Telefono</p>
                                    <p>E-mail</p>
                                    <p>Admin</p>
                                    <p>Indirizzo</p>
                                    <p>Termini accettati</p>
                                    <p>Codice cliente</p>
                                </div>
                                {users.map((user) => (
                                    <div
                                        key={"user " + user.id}
                                        className="listItem"
                                    >
                                        <p>{user.id || "N/A"}</p>
                                        <p>
                                            {user.first_name +
                                                " " +
                                                user.last_name || "N/A"}
                                        </p>
                                        <p>{user.phone || "N/A"}</p>
                                        <p>{user.email || "N/A"}</p>
                                        <p>{user.is_admin ? "Sì" : "No"}</p>
                                        <p>{user.shipping_address || "N/A"}</p>
                                        <p>{user.terms_accepted || "N/A"}</p>
                                        <p>{user.personal_code || "N/A"}</p>
                                    </div>
                                ))}
                            </>
                        ) : (
                            <p>Nessun risultato</p>
                        )
                    ) : (
                        <>
                            <p>Caricamento...</p>
                        </>
                    )}
                </div>
            </section>
        </main>
    );
}
