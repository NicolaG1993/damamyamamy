import Head from "next/head";
import Header from "../components/Header/Header";
import Footer from "../components/Footer/Footer";

import { useEffect } from "react";
import { fetchCart } from "../redux/LoadCart/loadCart.actions";
import { useDispatch } from "react-redux";
import { keepTheme } from "../shared/utils/themes";

export default function Layout({ children }) {
    const dispatch = useDispatch();
    useEffect(() => {
        keepTheme();
        dispatch(fetchCart());
    }, []);

    return (
        <>
            <Head>
                <meta
                    name="keywords"
                    content="usato, bambini, compro, negozio, articoli, seconda mano, giochi, abbigliamento"
                />
                <meta
                    name="viewport"
                    content="width=device-width, initial-scale=1.0"
                />
                <meta name="author" content="NGDesign - Nicola Gaioni" />
                <meta charSet="UTF-8" />

                <meta
                    name="description"
                    content="Accessori, Abbigliamento e giocattoli di seconda mano per bimbi da 0 a 10 anni"
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

            <Header />
            {children}
            <Footer />
        </>
    );
}

/*
per qualche motivo lo state viene ricaricato anche in Header, quando invece non dovrebbe, che sia per redux useSelector?
stando alla documentazione di Nextjs lo state del layout dovrebbe preservarsi e rimanere costante, ma durante la navigazione fa il refresh
*/
