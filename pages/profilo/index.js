import dynamic from "next/dynamic";
import { useRouter } from "next/router";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import { selectUserState, userLogout } from "@/redux/slices/userSlice";
import Cookies from "js-cookie";

function Profilo() {
    const router = useRouter();
    const dispatch = useDispatch();

    let userInfo = useSelector(selectUserState, shallowEqual);
    if (!userInfo) {
        router.push("/profilo/login");
    }

    const logout = () => {
        dispatch(userLogout());
        Cookies.remove("userInfo");
        Cookies.remove("cartItems");
        router.push("/");
    };

    return (
        <main>
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
                    <button disabled className="button-disabled">
                        Modifica profilo
                    </button>
                    <button onClick={() => logout()} className="button">
                        Esci
                    </button>
                </div>
            </section>
        </main>
    );
}

export default dynamic(() => Promise.resolve(Profilo), { ssr: false });
