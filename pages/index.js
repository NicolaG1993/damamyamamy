import Head from "next/head";
import Image from "next/image";

import { useState, useEffect } from "react";
import dynamic from "next/dynamic";

// REDUX
import { useDispatch, useSelector, shallowEqual } from "react-redux";
import {
    fetchData,
    fetchCategories,
    fetchSpecificCategories,
} from "../redux/ShopData/shopData.actions";
const loadData = (state) => state.shopData.data;
const loadCats = (state) => state.shopData.categories;
const loadCatNewItems = (state) => state.shopData.catNewItems;
const loadCat1 = (state) => state.shopData.cat1;
const loadCat2 = (state) => state.shopData.cat2;

//COMPONENTS
const Slider = dynamic(() => import("../components/Home/Slider/Slider"), {
    ssr: false,
});
const Shortlist = dynamic(() => import("../components/Shortlist/Shortlist"), {
    loading: () => <div className="loader" />,
}); //forse questo senza loader
import IconsList from "../components/Home/IconsList/IconsList";
import Button from "../components/Button/Button";

// import styles from "../shared/styles/Home.module.css";
import styles from "../components/Home/style/Home.module.css";

// UTILS
import useScrollPosition from "../shared/utils/useScrollPosition";
import useWindowDimensions from "../shared/utils/useWindowDimensions";

export default function Home() {
    //redux
    let data = useSelector(loadData, shallowEqual);
    let categories = useSelector(loadCats, shallowEqual);
    let catNewItems = useSelector(loadCatNewItems, shallowEqual);
    let cat1 = useSelector(loadCat1, shallowEqual);
    let cat2 = useSelector(loadCat2, shallowEqual);
    const dispatch = useDispatch();

    //hooks
    useEffect(() => {
        if (!data || !categories) {
            dispatch(fetchData());
            dispatch(fetchCategories());
        }
    }, []);

    useEffect(() => {
        data && console.log("data.data changed:", data);
        data && dispatch(fetchSpecificCategories());
    }, [data]);

    //style
    const [iconslistHeight, setIconslistHeight] = useState(`800px`);
    const [shortlistPadding, setShortlistPadding] =
        useState(`100px 40px 90px 40px`);
    const { scrollTop } = useScrollPosition();
    const { width } = useWindowDimensions();

    useEffect(() => {
        if (scrollTop > 1410) {
            if (width <= 720) {
                setIconslistHeight(`1000px`);
                setShortlistPadding(`100px 20px 120px 20px`);
            } else {
                setIconslistHeight(`400px`);
                setShortlistPadding(`100px 40px 90px 40px`);
            }
        } else {
            if (width <= 720) {
                setIconslistHeight(`800px`);
                setShortlistPadding(`100px 20px 120px 20px`);
            } else {
                setIconslistHeight(`800px`);
                setShortlistPadding(`100px 40px 300px 40px`);
            }
        }
    }, [scrollTop]);

    return (
        <div id={styles["Home"]}>
            <Head>
                <title>Da Mamy a Mamy</title>
                <meta property="og:type" content="website" />
                <meta property="og:title" content="Da Mamy a Mamy" />
            </Head>

            {/* <main className={styles.main}>
                <h1 className={styles.title}>
                    Welcome to <a href="https://nextjs.org">Next.js!</a>
                </h1>

                <p className={styles.description}>
                    Get started by editing{" "}
                    <code className={styles.code}>pages/index.js</code>
                </p>
 
                <div className={styles.grid}>
                    <a href="https://nextjs.org/docs" className={styles.card}>
                        <h2>Documentation &rarr;</h2>
                        <p>
                            Find in-depth information about Next.js features and
                            API.
                        </p>
                    </a>

                    <a href="https://nextjs.org/learn" className={styles.card}>
                        <h2>Learn &rarr;</h2>
                        <p>
                            Learn about Next.js in an interactive course with
                            quizzes!
                        </p>
                    </a>

                    <a
                        href="https://github.com/vercel/next.js/tree/master/examples"
                        className={styles.card}
                    >
                        <h2>Examples &rarr;</h2>
                        <p>
                            Discover and deploy boilerplate example Next.js
                            projects.
                        </p>
                    </a>

                    <a
                        href="https://vercel.com/new?utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app"
                        className={styles.card}
                    >
                        <h2>Deploy &rarr;</h2>
                        <p>
                            Instantly deploy your Next.js site to a public URL
                            with Vercel.
                        </p>
                    </a>
                </div>
            </main>

            <footer className={styles.footer}>
                <a
                    href="https://vercel.com?utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app"
                    target="_blank"
                    rel="noopener noreferrer"
                >
                    Powered by{" "}
                    <span className={styles.logo}>
                        <Image
                            src="/vercel.svg"
                            alt="Vercel Logo"
                            width={72}
                            height={16}
                        />
                    </span>
                </a>
            </footer> */}

            <Slider width={width} />

            <section
                className={styles["home-wrap"]}
                style={{ padding: shortlistPadding }}
            >
                <h2>IN NEGOZIO</h2>
                <Button
                    page="/shop"
                    text="Vedi tutti gli articoli"
                    type="internal"
                />

                <>
                    <Shortlist
                        products={catNewItems}
                        listTitle={"Ultimi arrivi"}
                    />
                    <Shortlist products={cat1} listTitle={"Giochi"} />
                    <Shortlist
                        products={cat2}
                        listTitle={"Passeggini e trasporto"}
                    />
                </>
            </section>
            <IconsList iconslistHeight={iconslistHeight} />
        </div>
    );
}
