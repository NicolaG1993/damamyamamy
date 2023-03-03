import { useEffect, useState } from "react";
import Head from "next/head";
import axios from "axios";
import { useDispatch, shallowEqual, useSelector } from "react-redux";
import { getError } from "@/utils/error";
import Link from "next/link";
import styles from "@/styles/Shop.module.css";
import { useRouter } from "next/router";
import { selectUserState } from "@/redux/slices/userSlice";

export default function Checkout() {
    const router = useRouter();
    const dispatch = useDispatch();
    const [activeStep, setActiveStep] = useState(1);

    let userInfo = useSelector(selectUserState, shallowEqual);
    if (!userInfo) {
        router.push("/profilo/login");
    }

    return (
        <main id={styles["Cart"]}>
            <Head>
                <title>Checkout • Da Mamy a Mamy</title>
                <meta property="og:title" content="Checkout • Da Mamy a Mamy" />
                <meta property="og:type" content="website" />
            </Head>
            <section className="page">
                <h1>Checkout</h1>
                {}
            </section>
        </main>
    );
}
