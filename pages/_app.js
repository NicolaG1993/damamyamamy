import "@/styles/globals.css";
import Layout from "@/constants/Layout/layout";
import Cookies from "js-cookie";

export default function App({ Component, pageProps }) {
    let userInfo = Cookies.get("userInfo")
        ? JSON.parse(Cookies.get("userInfo"))
        : undefined;
    return (
        <Layout userInfo={userInfo}>
            <Component {...pageProps} />
        </Layout>
    );
}
