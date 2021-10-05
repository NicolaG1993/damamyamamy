import Header from "../components/Header/Header";
import Nav from "../components/Header/Nav/Nav";

export default function Layout({ children }) {
    return (
        <>
            <Header />
            {/* <Nav /> */}
            {children}
        </>
    );
}
