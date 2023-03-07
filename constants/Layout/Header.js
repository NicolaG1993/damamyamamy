import Link from "next/link";
import Logo from "public/assets/brand/Logo.svg";

export default function Header({ userInfo, width, isSmallDevice }) {
    return (
        <header>
            <Link href={"/"} id="HeaderLogo">
                <Logo />
            </Link>
            {isSmallDevice ? (
                <div>Hamburger</div>
            ) : (
                <nav>
                    <Link href={"/"}>Home</Link>
                    <Link href={"/negozio"}>In negozio</Link>
                    <Link href={"/documenti/regolamento"}>Vendi</Link>
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
            )}
        </header>
    );
}
