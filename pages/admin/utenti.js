import axios from "axios";
import dynamic from "next/dynamic";
import { useRouter } from "next/router";
import Link from "next/link";
import { shallowEqual, useSelector } from "react-redux";
import { useEffect, useState } from "react";

import styles from "../../components/AdminDashboard/style/AdminDashboard.module.css";
import { formatDateShort } from "../../shared/utils/convertTimestamp";

const loggedUser = (state) => state.user.userInfo;

function AdminAllUsers() {
    let userInfo = useSelector(loggedUser, shallowEqual);
    const router = useRouter();
    const [allUsers, setAllUsers] = useState([]);
    const [displayedUsers, setDisplayedUsers] = useState([]);
    const [filters, setFilters] = useState({ research: "", order: "date asc" });

    useEffect(() => {
        if (!userInfo) {
            router.push("/login");
        }
        if (!userInfo.is_admin) {
            router.push("/");
        }
        const fetchData = async () => {
            try {
                const { data } = await axios.get(`/api/admin/users`, {
                    headers: { authorization: `Bearer ${userInfo.token}` },
                });
                setAllUsers(data);
            } catch (err) {
                // dispatch({ type: "FETCH_FAIL", payload: getError(err) });
            }
        };
        fetchData();
    }, []);

    console.log("userinfo:", userInfo);
    useEffect(() => {
        let source = allUsers;
        let matchResults = [];

        if (filters.research === "") {
            matchResults = allUsers;
        } else {
            source.filter((user) => {
                if (
                    user.name.toLowerCase().indexOf(filters.research) === 0 ||
                    user.email.toLowerCase().indexOf(filters.research) === 0
                ) {
                    matchResults.push(user);
                }
            });
        }

        filters.order === "date asc" &&
            matchResults.sort(
                (a, b) => new Date(a.created_at) - new Date(b.created_at)
            );

        filters.order === "date disc" &&
            matchResults.sort(
                (a, b) => new Date(b.created_at) - new Date(a.created_at)
            );

        filters.order === "admin" &&
            (matchResults = matchResults.filter((el) => el.is_admin)); //filter doesnt mutate original array

        filters.order === "not admin" &&
            (matchResults = matchResults.filter((el) => !el.is_admin));

        setDisplayedUsers([...matchResults]);
    }, [filters, allUsers]);

    return (
        <div id={styles["AdminComponent"]}>
            <h1>Tutti gli utenti</h1>

            <p>Ordina per</p>
            <select
                defaultValue={"date asc"}
                onChange={(e) =>
                    setFilters({ ...filters, order: e.target.value })
                }
            >
                <option value={"date asc"}>
                    Data di registrazione (ascendente)
                </option>
                <option value={"date disc"}>
                    Data di registrazione (discendente)
                </option>
                <option value={"admin"}>Amministratori</option>
                <option value={"not admin"}>Utenti</option>
            </select>

            <p>Trova nome o email</p>
            <input
                type="text"
                onChange={(e) =>
                    setFilters({
                        ...filters,
                        research: e.target.value.toLowerCase(),
                    })
                }
            ></input>

            <div>
                <div className={styles["admin-user-head"]}>
                    <h4>ID</h4>
                    <h4>Nome</h4>
                    <h4>Email</h4>
                    <h4>Account</h4>
                    {/* <h4>Autorizzazione</h4> */}
                    <h4>Data registrazione</h4>
                    <h4>Azione</h4>
                    {/* <h4>Consegna</h4> */}
                </div>

                {displayedUsers &&
                    displayedUsers.map((user) => (
                        <div key={user.id} className={styles["admin-user-box"]}>
                            <p>#{user.id}</p>
                            <p>{user.name}</p>
                            <p>{user.email}</p>

                            {user.is_admin ? <p>Admin</p> : <p>Utente</p>}
                            <p>{formatDateShort(user.created_at)}</p>

                            <Link href={`/admin/utente/${user.id}`}>
                                <a>
                                    <button>Visualizza</button>
                                </a>
                            </Link>
                        </div>
                    ))}
            </div>

            <Link href="/admin/dashboard">
                <a>
                    <h5>Torna indietro</h5>
                </a>
            </Link>
        </div>
    );
}

export default dynamic(() => Promise.resolve(AdminAllUsers), { ssr: false });
