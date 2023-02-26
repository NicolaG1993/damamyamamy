import Link from "next/link";

export default function Header({ userInfo }) {
    return (
        <header>
            <div id="HeaderLogo"></div>
            <nav>
                <Link href={"/"}>Home</Link>
                <Link href={"/negozio"}>In negozio</Link>
                <Link href={"/vendi"}>Vendi</Link>
                <Link href={"/chi-siamo"}>Chi siamo</Link>
                <Link href={"/contatto"}>Contatto</Link>
                {userInfo ? (
                    userInfo.is_admin ? (
                        <>
                            <Link href={"/profilo"}>Profilo</Link>
                            <Link href={"/admin"} className="admin">
                                Admin
                            </Link>
                        </>
                    ) : (
                        <Link href={"/profilo"}>Profilo</Link>
                    )
                ) : (
                    <Link href={"/profilo/login"}>Accedi</Link>
                )}
            </nav>
        </header>
    );
}
