import Head from "next/head";
import Header from "../components/Header/Header";
import Footer from "../components/Footer/Footer";

import { useEffect, useState } from "react";
// import { fetchCart } from "../redux/Cart/cart.actions";
import { keepTheme } from "../shared/utils/themes";

import { useDispatch, useSelector } from "react-redux";

const selectUserInfo = (state) => state.user.userInfo;

export default function Layout({ children }) {
    const dispatch = useDispatch();
    const [userInfo, setUserInfo] = useState(null);

    let selectedUserInfo = useSelector(selectUserInfo);

    useEffect(() => {
        keepTheme();
        setUserInfo(selectedUserInfo);
        // dispatch(fetchCart());
    }, []);

    useEffect(() => setUserInfo(selectedUserInfo), [selectedUserInfo]);

    return (
        <>
            <Head>
                <meta
                    name="keywords"
                    content="usato, bambini, compro, negozio, articoli, seconda mano, giochi, abbigliamento, cavaion, verona"
                />
                <meta
                    name="viewport"
                    content="width=device-width, initial-scale=1.0"
                />
                <meta name="author" content="NGDesign - Nicola Gaioni" />
                <meta charSet="UTF-8" />

                <meta
                    name="description"
                    content="Negozio di accessori, abbigliamento e giocattoli di seconda mano per bimbi da 0 a 10 anni. Situato in Vicolo Teatro, 4, 37010 Cavaion Veronese, Verona, Italia"
                />

                <meta
                    property="og:description"
                    content="Accessori, Abbigliamento e giocattoli di seconda mano per bimbi da 0 a 10 anni"
                />
                <meta property="og:url" content="https://damamyamamy.com" />
                <meta property="og:image" content="/logo192.png" />
                <meta property="og:image:alt" content="Il nostro logo" />
                <link rel="icon" href="/favicon.ico" />
                <link rel="manifest" href="/manifest.json" />
                <link
                    rel="apple-touch-icon"
                    sizes="192x192"
                    href="/logo192.png"
                />
                <link
                    rel="apple-touch-icon"
                    sizes="512x512"
                    href="/logo512.png"
                />
            </Head>

            <Header userInfo={userInfo} />
            {children}
            <Footer />
        </>
    );
}

/*
per qualche motivo lo state viene ricaricato anche in Header, quando invece non dovrebbe, che sia per redux useSelector?
stando alla documentazione di Nextjs lo state del layout dovrebbe preservarsi e rimanere costante, ma durante la navigazione fa il refresh
*/
