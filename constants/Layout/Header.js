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
                    <Link href={"/profilo"}>Profilo</Link>
                ) : (
                    <Link href={"/login"}>Accedi</Link>
                )}
            </nav>
        </header>
    );
}
