//api fetch utente
//no ssr
//scheda utente

import dynamic from "next/dynamic";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/router";
import { useContext, useEffect, useReducer, useState } from "react";
// import { Store } from "../../utils/Store";
import { useSnackbar } from "notistack";
import { getError } from "../../../shared/utils/error";
import axios from "axios";

import Cookies from "js-cookie";

import { formatJSDate } from "../../../shared/utils/convertTimestamp";

import { shallowEqual, useSelector } from "react-redux";
const loggedUser = (state) => state.user.userInfo;

function AdminUser({ params }) {
    const userId = Number(params.id);
    const router = useRouter();
    let userInfo = useSelector(loggedUser, shallowEqual);

    const { closeSnackbar, enqueueSnackbar } = useSnackbar();

    const [user, setUser] = useState();
    const [error, setError] = useState();

    useEffect(() => {
        if (!userInfo) {
            router.push("/login");
        }

        const fetchUser = async () => {
            try {
                const { data } = await axios.get(`/api/users/${userId}`, {
                    headers: {
                        authorization: `Bearer ${userInfo.token}`,
                    },
                });
                setUser(data.rows[0]);
            } catch (err) {
                setError(getError(err));
                enqueueSnackbar(getError(err), { variant: "error" });
            }
        };

        fetchUser();
    }, []);

    console.log("user:", user);
    return (
        <main>
            {!user ? (
                <h3>Loading...</h3>
            ) : error ? (
                <h3>{error}</h3>
            ) : (
                <div>
                    <h1>Dati utente: #{user.id}</h1>
                    <p>Nome: {user.name}</p>
                    <p>Email: {user.email}</p>
                    <p>Registrato il: {formatJSDate(user.created_at)}</p>
                    <p>
                        Autorizzazione:{" "}
                        {user.is_admin ? "Amministratore" : "Utente"}
                    </p>
                </div>
            )}
        </main>
    );
}

export async function getServerSideProps({ params }) {
    return { props: { params } };
}
export default dynamic(() => Promise.resolve(AdminUser), { ssr: false });
