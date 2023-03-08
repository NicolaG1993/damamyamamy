import Link from "next/link";

export default function SideNav({ close, navIsActive, userInfo }) {
    return (
        <nav id="SideNav" className={`${navIsActive ? "nav-on" : "nav-off"}`}>
            <Link href={"/"} onClick={() => close()}>
                Home
            </Link>
            <Link href={"/negozio"} onClick={() => close()}>
                In negozio
            </Link>
            <Link href={"/documenti/regolamento"} onClick={() => close()}>
                Vendi
            </Link>
            <Link href={"/chi-siamo"} onClick={() => close()}>
                Chi siamo
            </Link>
            <Link href={"/contatto"} onClick={() => close()}>
                Contatto
            </Link>
            {userInfo ? (
                userInfo.is_admin ? (
                    <>
                        <Link href={"/profilo"} onClick={() => close()}>
                            Profilo
                        </Link>
                        <Link
                            href={"/admin"}
                            className="admin"
                            onClick={() => close()}
                        >
                            Admin
                        </Link>
                    </>
                ) : (
                    <Link href={"/profilo"} onClick={() => close()}>
                        Profilo
                    </Link>
                )
            ) : (
                <Link href={"/profilo/login"} onClick={() => close()}>
                    Accedi
                </Link>
            )}
        </nav>
    );
}
