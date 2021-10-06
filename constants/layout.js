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
