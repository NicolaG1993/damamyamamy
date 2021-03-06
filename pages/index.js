import Head from "next/head";

import { useState, useEffect } from "react";
import dynamic from "next/dynamic";
import prisma from "../shared/libs/prisma";

// REDUX
/* import { useDispatch, useSelector, shallowEqual } from "react-redux";
import {
    fetchData,
    fetchCategories,
    fetchSpecificCategories,
} from "../redux/ShopData/shopData.actions";
const loadData = (state) => state.shopData.data;
const loadCats = (state) => state.shopData.categories;
const loadCatNewItems = (state) => state.shopData.catNewItems;
const loadCat1 = (state) => state.shopData.cat1;
const loadCat2 = (state) => state.shopData.cat2; */

//COMPONENTS
const Slider = dynamic(() => import("../components/Home/Slider/Slider"), {
    ssr: false,
});
// const Shortlist = dynamic(() => import("../components/Shortlist/Shortlist"), {
//     loading: () => <div className="loader" />,
// }); //forse questo senza loader
import Shortlist from "../components/Shortlist/Shortlist";
import IconsList from "../components/Home/IconsList/IconsList";
import Button from "../components/Button/Button";

// import styles from "../shared/styles/Home.module.css";
import styles from "../components/Home/style/Home.module.css";

// UTILS
import useScrollPosition from "../shared/utils/useScrollPosition";
import useWindowDimensions from "../shared/utils/useWindowDimensions";
import { formatJSDate } from "../shared/utils/convertTimestamp";

export default function Home({ catNewItems, cat1, cat2 }) {
    //redux
    /* let data = useSelector(loadData, shallowEqual);
    let categories = useSelector(loadCats, shallowEqual);
    let catNewItems = useSelector(loadCatNewItems, shallowEqual);
    let cat1 = useSelector(loadCat1, shallowEqual);
    let cat2 = useSelector(loadCat2, shallowEqual); 
    const dispatch = useDispatch(); */

    //hooks
    useEffect(() => {
        /* if (!data || !categories) {
            dispatch(fetchData());
            dispatch(fetchCategories());
        } */
    }, []);

    /*  useEffect(() => {
        // data && console.log("data.data changed:", data);
        data && dispatch(fetchSpecificCategories());
    }, [data]); */

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
                <title>
                    Da Mamy a Mamy - Mercatino dell&apos;usato per Bambini in
                    provincia di Verona
                </title>
                <meta property="og:type" content="website" />
                <meta
                    property="og:title"
                    content="Da Mamy a Mamy - Mercatino dell'usato per Bambini in provincia di Verona"
                />
            </Head>

            <h1>
                Da Mamy a Mamy - Negozio di accessori, passeggini, abbigliamento
                e giocattoli di seconda mano per bimbi da 0 a 10 anni
            </h1>
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
                    <Shortlist products={cat1} listTitle={"Abbigliamento"} />
                    <Shortlist products={cat2} listTitle={"Giochi"} />
                </>
            </section>
            <IconsList iconslistHeight={iconslistHeight} />
        </div>
    );
}

export async function getServerSideProps() {
    let feedNew = await prisma.products.findMany({
        where: { count_in_stock: { gt: 0 } },
        orderBy: {
            created_at: "desc",
        },
        take: 20,
    });
    let feedA = await prisma.products.findMany({
        where: {
            count_in_stock: { gt: 0 },
            categories: {
                has: "Abbigliamento",
            },
        },
        orderBy: {
            created_at: "asc",
        },
        take: 20,
    });
    let feedB = await prisma.products.findMany({
        where: {
            count_in_stock: { gt: 0 },
            categories: {
                has: "Giochi",
            },
        },
        orderBy: {
            created_at: "asc",
        },
        take: 20,
    });

    const validateFeeds = (arr) =>
        arr.map((el) => {
            el.price = Number(el.price);
            el.created_at = formatJSDate(el.created_at);
            return el;
        });

    return {
        props: {
            catNewItems: validateFeeds(feedNew),
            cat1: validateFeeds(feedA),
            cat2: validateFeeds(feedB),
        },
    };
}

/*
POSTGRESQL VERSION
export async function getServerSideProps(context) {
    console.log("__dirname", __dirname);
    const { data } = await axios.get(
        `http://localhost:3000/api/home-categories`
    );
    // const { data } = await axios.get(`/api/home-categories`);
    // const { data } = await axios.get(
    //     `https://damamyamamy.com/api/home-categories`
    // );

    return {
        props: {
            catNewItems: data.catNewItems,
            cat1: data.cat1,
            cat2: data.cat2,
        },
    };
}
// getStaticProps // getServerSideProps

*/
