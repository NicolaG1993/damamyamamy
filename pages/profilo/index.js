import dynamic from "next/dynamic";
import { useRouter } from "next/router";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import { selectUserState, userLogout } from "@/redux/slices/userSlice";
import Link from "next/link";
import Head from "next/head";

function Profilo() {
    const router = useRouter();
    const dispatch = useDispatch();

    let userInfo = useSelector(selectUserState);
    if (!userInfo) {
        router.push("/profilo/login");
    }
    console.log("User: ", userInfo);

    const logout = () => {
        dispatch(userLogout());
        router.push("/");
    };

    return (
        <main>
            <Head>
                <title>Il tuo profilo • Da Mamy a Mamy</title>
                <meta property="og:type" content="website" />
                <meta
                    property="og:title"
                    content="Il tuo profilo • Da Mamy a Mamy"
                />
            </Head>
            <section className="page">
                <h1>Il mio profilo</h1>
                <div className={"document-text-wrap"}>
                    <h3>ID: {userInfo && userInfo.id}</h3>
                    <h3>
                        Nome:{" "}
                        {userInfo &&
                            userInfo.firstName + " " + userInfo.lastName}
                    </h3>
                    <h3>Email: {userInfo && userInfo.email}</h3>
                </div>
                <div className={"document-double-button-wrap"}>
                    <Link className="button" href={"/profilo/ordini"}>
                        I tuoi ordini
                    </Link>
                    <Link className="button" href={"/profilo/modifica"}>
                        Modifica profilo
                    </Link>

                    <button onClick={() => logout()} className="button">
                        Esci
                    </button>
                </div>
            </section>
        </main>
    );
}

export default dynamic(() => Promise.resolve(Profilo), { ssr: false });
