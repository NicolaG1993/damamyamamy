import "@/styles/globals.css";
import Layout from "@/constants/Layout/layout";
import Cookies from "js-cookie";
import { useEffect, useState } from "react";

export default function App({ Component, pageProps }) {
    return (
        <Layout>
            <Component {...pageProps} />
        </Layout>
    );
}
