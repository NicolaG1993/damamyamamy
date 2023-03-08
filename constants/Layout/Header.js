import HamburgerButton from "@/components/Buttons/HamburgerButton/HamburgerButton";
import Link from "next/link";
import Logo from "public/assets/brand/Logo.svg";

export default function Header({
    userInfo,
    width,
    isSmallDevice,

    toggleNav,
    closeNav,
}) {
    return (
        <header>
            <Link href={"/"} id="HeaderLogo" onClick={() => closeNav()}>
                <Logo />
            </Link>
            {isSmallDevice ? (
                <HamburgerButton toggleNav={toggleNav} />
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
