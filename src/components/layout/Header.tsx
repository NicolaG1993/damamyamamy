import Link from "next/link";
import styles from "./Header.module.css";
import Image from "next/image";
import HamburgerButton from "@/components/shared/HamburgerButton/HamburgerButton";

interface HeaderProps {
    isSmallDevice: boolean;
}

export default function Header({ isSmallDevice }: HeaderProps) {
    // let layouts = useSelector(selectLayoutsState, shallowEqual);

    // const getBtnStyle = () => {
    //     if (layouts[1].status) {
    //         return styles["hamBtn-active"];
    //     } else {
    //         return styles["hamBtn"];
    //     }
    // };

    return (
        <header className={styles.header}>
            <div className={styles.logo}>
                <Link href={"/"}>
                    <Image
                        src="/assets/brand/Logo.svg"
                        alt="Da Mamy a Mamy logo"
                        width={63}
                        height={44}
                        priority
                    />
                </Link>
            </div>
            {isSmallDevice ? (
                <HamburgerButton onClick={toggleNav} isActive={false} />
            ) : (
                <nav className={styles.nav}>
                    <ul>
                        <li>
                            <Link href={"/"}>Home</Link>
                        </li>
                        <li>
                            <Link href={"/prodotti"}>Prodotti</Link>
                        </li>
                        <li>
                            <Link href={"/info/regolamento"}>Vendi</Link>
                        </li>
                        <li>
                            <Link href={"/chi-siamo"}>Chi siamo</Link>
                        </li>
                        <li>
                            <Link href={"/contatto"}>Contatto</Link>
                        </li>
                    </ul>
                </nav>
            )}
        </header>
    );
}
